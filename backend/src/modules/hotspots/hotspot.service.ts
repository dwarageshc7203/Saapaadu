import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotspot } from './entities/hotspot.entity';
import { Vendor } from '../vendor/entities/vendor.entity';
import { Customer } from '../customer/entities/customer.entity';
import { MailerService } from '../mailer/mailer.service';
import { CreateHotspotDto } from './dto/create-hotspot.dto';

@Injectable()
export class HotspotsService {
  constructor(
    @InjectRepository(Hotspot) private hotspotRepo: Repository<Hotspot>,
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private mailerService: MailerService,
  ) {}

  /** Public listing for customer map */
  findAll() {
    return this.hotspotRepo.find({
      relations: ['vendor'],
      order: { hid: 'DESC' as any }, // adjust if your PK is different
    });
  }

  /** Vendor creates a hotspot; notify customers in same area */
  async createFromVendor(userId: number, dto: CreateHotspotDto) {
    // Find vendor by the authenticated user
    const vendor = await this.vendorRepo.findOne({
      where: { user: { id: userId } as any },
      relations: ['user'],
    });
    if (!vendor) throw new ForbiddenException('Vendor not found for user');

    const hotspot = this.hotspotRepo.create({
      ...dto,          // must include: name, area, (optional lat/lng if you keep them)
      vendor,
    });
    await this.hotspotRepo.save(hotspot);

    await this.notifyCustomersInSameArea(hotspot);

    return hotspot;
  }

  /** Single hotspot by id */
  async findOne(hid: number) {
    const h = await this.hotspotRepo.findOne({
      where: { hid } as any,
      relations: ['vendor', 'vendor.user'],
    });
    if (!h) throw new NotFoundException('Hotspot not found');
    return h;
  }

  /** Vendor can update only their own hotspot */
  async updateForVendor(userId: number, hid: number, dto: Partial<CreateHotspotDto>) {
    const vendor = await this.vendorRepo.findOne({
      where: { user: { id: userId } as any },
      relations: ['user'],
    });
    if (!vendor) throw new ForbiddenException('Vendor not found for user');

    const hotspot = await this.findOne(hid);
    if (hotspot.vendor?.id !== vendor.id) {
      // If you use `vid` instead of `id`, change to `vendor.vid` / `hotspot.vendor.vid`
      throw new ForbiddenException('You do not own this hotspot');
    }

    Object.assign(hotspot, dto);
    return this.hotspotRepo.save(hotspot);
  }

  /** Vendor can delete only their own hotspot */
  async removeForVendor(userId: number, hid: number) {
    const vendor = await this.vendorRepo.findOne({
      where: { user: { id: userId } as any },
      relations: ['user'],
    });
    if (!vendor) throw new ForbiddenException('Vendor not found for user');

    const hotspot = await this.findOne(hid);
    if (hotspot.vendor?.id !== vendor.id) {
      throw new ForbiddenException('You do not own this hotspot');
    }

    await this.hotspotRepo.delete({ hid } as any);
    return { ok: true };
  }

  /**
   * Optional generic creator (not vendor-scoped).
   * If you don’t need this, remove it and only use createFromVendor.
   */
  async createHotspot(dto: CreateHotspotDto) {
    const hotspot = this.hotspotRepo.create(dto);
    await this.hotspotRepo.save(hotspot);
    await this.notifyCustomersInSameArea(hotspot);
    return hotspot;
  }

  /** Notify customers who share the same `area` as the hotspot */
  private async notifyCustomersInSameArea(hotspot: Hotspot) {
    if (!hotspot.area) return;

    const customers = await this.customerRepo.find({
      where: { area: hotspot.area } as any,
      relations: ['user'],
    });

    for (const customer of customers) {
      const email = customer.user?.email;
      if (!email) continue;

      // Prefer a dedicated helper if you added one; otherwise fall back to sendMail
      if ((this.mailerService as any).sendHotspotEmail) {
        await (this.mailerService as any).sendHotspotEmail(email, hotspot);
      } else {
        await this.mailerService.sendMail({
          to: email,
          subject: `New hotspot in your area: ${hotspot.name ?? hotspot['title'] ?? 'Hotspot'}`,
          text: `A new hotspot "${hotspot.name ?? hotspot['title'] ?? 'Hotspot'}" just opened in ${hotspot.area}. Check Saapaadu to order now!`,
        });
      }
    }
  }
}
