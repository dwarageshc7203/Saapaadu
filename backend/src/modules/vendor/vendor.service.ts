import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async findByUid(uid: number): Promise<Vendor | null> {
    return this.vendorRepo.findOne({ where: { uid }, relations: ['user'] });
  }

  async update(uid: number, dto: UpdateVendorDto): Promise<Vendor> {
    const vendor = await this.findByUid(uid);
    if (!vendor) throw new Error('Vendor not found');
    Object.assign(vendor, dto);
    return this.vendorRepo.save(vendor);
  }
}
