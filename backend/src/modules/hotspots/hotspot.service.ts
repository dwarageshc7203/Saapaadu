import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotspot } from './entities/hotspot.entity';
import { Vendor } from '../vendor/entities/vendor.entity';

@Injectable()
export class HotspotsService {
  constructor(
    @InjectRepository(Hotspot) private repo: Repository<Hotspot>,
    @InjectRepository(Vendor) private vendors: Repository<Vendor>,
  ) {}

  findAll() {
    return this.repo.find({ order: { hid: 'DESC' } });
  }

  async createFromVendor(userId: number, dto: any) {
    const vendor = await this.vendors.findOne({ where: { uid: userId } });
    if (!vendor) throw new ForbiddenException('Only vendors can create hotspots');

    const hotspot = this.repo.create({
      ...dto,
      vid: vendor.vid,
      vendor,
    });
    return this.repo.save(hotspot);
  }

  async findOne(hid: number) {
    const h = await this.repo.findOne({ where: { hid } });
    if (!h) throw new NotFoundException('Hotspot not found');
    return h;
  }

  async updateForVendor(userId: number, hid: number, dto: any) {
    const vendor = await this.vendors.findOne({ where: { uid: userId } });
    if (!vendor) throw new ForbiddenException();
    const h = await this.findOne(hid);
    if (h.vid !== vendor.vid) throw new ForbiddenException();
    Object.assign(h, dto);
    return this.repo.save(h);
  }

  async removeForVendor(userId: number, hid: number) {
    const vendor = await this.vendors.findOne({ where: { uid: userId } });
    if (!vendor) throw new ForbiddenException();
    const h = await this.findOne(hid);
    if (h.vid !== vendor.vid) throw new ForbiddenException();
    await this.repo.delete({ hid });
    return { ok: true };
  }
}
