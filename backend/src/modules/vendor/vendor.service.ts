import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByUid(uid: number): Promise<Vendor | null> {
    return this.vendorRepo.findOne({ where: { uid }, relations: ['user'] });
  }

  /**
   * Ensure a Vendor row exists for the given uid. If not, create a minimal record
   * using the linked User's username. This handles older accounts created before
   * vendor auto-creation logic or seeded databases.
   */
  async getOrCreate(uid: number): Promise<Vendor> {
    let vendor = await this.findByUid(uid);
    if (vendor) return vendor;

    const user = await this.userRepo.findOne({ where: { id: uid } });
    if (!user) throw new Error('User not found for vendor');

    vendor = this.vendorRepo.create({
      uid: user.id,
      user,
      username: user.username ?? user.email,
      verification: false,
    });
    return this.vendorRepo.save(vendor);
  }

  async update(uid: number, dto: UpdateVendorDto): Promise<Vendor> {
    const vendor = await this.getOrCreate(uid);
    Object.assign(vendor, dto);
    return this.vendorRepo.save(vendor);
  }
}
