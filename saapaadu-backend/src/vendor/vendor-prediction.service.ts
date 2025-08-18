import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorPrediction } from './vendor-prediction.entity';
import { CreateVendorPredictionDto } from './dto/create-vendor-prediction.dto';
import { Vendor } from '../vendor/vendor.entity';

@Injectable()
export class VendorPredictionService {
  constructor(
    @InjectRepository(VendorPrediction)
    private predictionRepo: Repository<VendorPrediction>,
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async create(vendorId: number, dto: CreateVendorPredictionDto): Promise<VendorPrediction> {
    const vendor = await this.vendorRepo.findOne({ where: { vendor_id: vendorId } });
    if (!vendor) throw new NotFoundException('Vendor not found');

    const prediction = this.predictionRepo.create({ ...dto, vendor });
    return this.predictionRepo.save(prediction);
  }

  async findByVendor(vendorId: number): Promise<VendorPrediction[]> {
    return this.predictionRepo.find({ where: { vendor: { vendor_id: vendorId } }, relations: ['vendor'] });
  }
}
