import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotspot } from './entities/hotspot.entity';
import { CreateHotspotDto } from './dto/create-hotspot.dto';

@Injectable()
export class HotspotService {
  constructor(
    @InjectRepository(Hotspot)
    private hotspotRepo: Repository<Hotspot>,
  ) {}

  async create(vid: number, dto: CreateHotspotDto): Promise<Hotspot> {
    const hotspot = this.hotspotRepo.create({ ...dto, vid });
    return this.hotspotRepo.save(hotspot);
  }

  async findAll(): Promise<Hotspot[]> {
    return this.hotspotRepo.find({ relations: ['vendor'] });
  }

  async findByVendor(vid: number): Promise<Hotspot[]> {
    return this.hotspotRepo.find({ where: { vid }, relations: ['vendor'] });
  }
}
