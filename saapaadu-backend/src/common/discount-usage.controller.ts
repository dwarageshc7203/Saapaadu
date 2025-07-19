import { Controller, Get, Param, Post } from '@nestjs/common';
import { DiscountUsageService } from './discount-usage.service';

@Controller('discount-usage')
export class DiscountUsageController {
  constructor(private readonly usageService: DiscountUsageService) {}

  @Post(':customerId')
  async create(@Param('customerId') customerId: number) {
    return this.usageService.createUsage(customerId);
  }

  @Get(':customerId')
  async getByCustomer(@Param('customerId') customerId: number) {
    return this.usageService.getUsagesByCustomer(customerId);
  }
}
