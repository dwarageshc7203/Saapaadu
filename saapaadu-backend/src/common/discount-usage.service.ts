import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountUsage } from './discount-usage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountUsageService {
  constructor(
    @InjectRepository(DiscountUsage)
    private usageRepo: Repository<DiscountUsage>,
  ) {}

  async createUsage(customerId: number): Promise<DiscountUsage> {
    const usage = this.usageRepo.create({ customer: { customer_id: customerId } });
    return this.usageRepo.save(usage);
  }

  async getUsagesByCustomer(customerId: number): Promise<DiscountUsage[]> {
    return this.usageRepo.find({
      where: { customer: { customer_id: customerId } },
      relations: ['customer'],
    });
  }
}
