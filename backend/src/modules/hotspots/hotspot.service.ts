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

  // validate vendor profile
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

  // veg/non-veg logic
  const vegNonVeg: 'veg' | 'nonveg' | undefined =
    (dto as any).veg_nonveg ?? vendor.veg_nonveg;
  if (!vegNonVeg) {
    throw new BadRequestException('veg_nonveg must be provided');
  }

  const normalizedDuration =
    dto.duration && dto.duration <= 24 ? dto.duration * 60 : dto.duration;

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

// Call reusable notifier
await this.notifyCustomersIfNearby(savedHotspot);

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

async notifyCustomersIfNearby(hotspot: Hotspot) {
const customers = await this.customerRepo.find({
  where: { area: hotspot.area }, // only filter by area
  relations: ['user'],
});

console.log("📢 Customers found just by area:", customers.length);


  console.log(`📢 Found ${customers.length} customers in area ${hotspot.area}`);

  for (const c of customers) {
    if (c.user?.email) {
      try {
        await this.mailerService.sendMail({
          to: c.user.email,
          subject: `New ${hotspot.veg_nonveg} meal available near you!`,
          text: `Hi ${c.username ?? c.user.email}, 
A new meal hotspot is available!

Shop: ${hotspot.shopName}
Address: ${hotspot.shopAddress}
Meal: ${hotspot.mealName}
Price: ₹${hotspot.price}

Hurry before it's gone!`,
        });

        console.log(`✅ Mail sent to ${c.user.email}`);
      } catch (err) {
        console.error(`❌ Failed to send to ${c.user.email}:`, err.message);
      }
    } else {
      console.log(`⚠️ Skipped customer ${c.cid}, no email`);
    }
  }
}
}
