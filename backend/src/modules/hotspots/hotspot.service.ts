// backend/src/modules/hotspots/hotspot.service.ts
import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotspot } from './entities/hotspot.entity';
import { Vendor } from '../vendor/entities/vendor.entity';
import { Customer } from '../customer/entities/customer.entity';
import { CreateHotspotDto } from './dto/create-hotspot.dto';
import { UpdateHotspotDto } from './dto/update-hotspot.dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class HotspotsService {
  constructor(
    @InjectRepository(Hotspot) private hotspotRepo: Repository<Hotspot>,
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private mailerService: MailerService,
  ) {}

  async findAll() {
    return this.hotspotRepo.find({ relations: ['vendor'] });
  }

  async findByVendor(uid: number) {
    return this.hotspotRepo
      .createQueryBuilder('hotspot')
      .innerJoinAndSelect('hotspot.vendor', 'vendor')
      .where('vendor.uid = :uid', { uid })
      .getMany();
  }

  async findOne(id: number) {
    const hotspot = await this.hotspotRepo.findOne({ where: { hid: id }, relations: ['vendor'] });
    if (!hotspot) throw new NotFoundException('Hotspot not found');
    return hotspot;
  }

  async createFromVendor(vendorUid: number, dto: CreateHotspotDto) {
    const vendor = await this.vendorRepo.findOne({ where: { uid: vendorUid } });
    if (!vendor) throw new NotFoundException('Vendor not found');

    // Ensure vendor has minimum profile fields filled for hotspot context
    const missing: string[] = [];
    if (!vendor.shopName) missing.push('shopName');
    if (!vendor.shopAddress) missing.push('shopAddress');
    if (!vendor.area) missing.push('area');
    if (!vendor.city) missing.push('city');
    if (!vendor.state) missing.push('state');
    if (missing.length) {
      throw new BadRequestException(
        `Complete vendor profile before creating hotspots: missing ${missing.join(', ')}`,
      );
    }

    // Respect the value coming from the form; fall back to vendor preference
    const vegNonVeg: 'veg' | 'nonveg' | undefined =
      (dto as any).veg_nonveg ?? vendor.veg_nonveg;
    if (!vegNonVeg) {
      throw new BadRequestException('veg_nonveg must be provided');
    }

    // Frontend uses hours; store minutes if a small number is provided
    const normalizedDuration = dto.duration && dto.duration <= 24 ? dto.duration * 60 : dto.duration;

    const hotspot = this.hotspotRepo.create({
      mealName: dto.mealName,
      mealCount: dto.mealCount,
      price: dto.price,
      duration: normalizedDuration,
      veg_nonveg: vegNonVeg,
      vendor,
      vid: vendor.vid,
      shopName: vendor.shopName!,
      shopAddress: vendor.shopAddress!,
      area: vendor.area!,
      city: vendor.city!,
      state: vendor.state!,
      latitude: vendor.latitude,
      longitude: vendor.longitude,
      shopImage: vendor.shopImage,
    });

    const savedHotspot = await this.hotspotRepo.save(hotspot);

    // notify customers in same area
    const customers = await this.customerRepo.find({ where: { area: vendor.area } });
    for (const customer of customers) {
      if (customer.user?.email) {
        await this.mailerService.sendMail({
          to: customer.user.email,
          subject: `New Hotspot: ${savedHotspot.mealName}`,
          text: `New meal hotspot available at ${savedHotspot.shopName} in ${savedHotspot.area}.`,
        });
      }
    }

    return savedHotspot;
  }

  async updateForVendor(vendorUid: number, hotspotId: number, dto: UpdateHotspotDto) {
    const hotspot = await this.hotspotRepo.findOne({ where: { hid: hotspotId }, relations: ['vendor'] });
    if (!hotspot) throw new NotFoundException('Hotspot not found');

    if (hotspot.vendor.uid !== vendorUid) {
      throw new ForbiddenException('You cannot update another vendor’s hotspot');
    }

    Object.assign(hotspot, dto);
    return this.hotspotRepo.save(hotspot);
  }

  async removeForVendor(vendorUid: number, hotspotId: number) {
    const hotspot = await this.hotspotRepo.findOne({ where: { hid: hotspotId }, relations: ['vendor'] });
    if (!hotspot) throw new NotFoundException('Hotspot not found');

    if (hotspot.vendor.uid !== vendorUid) {
      throw new ForbiddenException('You cannot delete another vendor’s hotspot');
    }

    await this.hotspotRepo.remove(hotspot);
    return { message: 'Hotspot deleted successfully' };
  }
}
