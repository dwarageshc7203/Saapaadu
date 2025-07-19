import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountUsage } from './discount-usage.entity';
import { DiscountUsageService } from './discount-usage.service';
import { DiscountUsageController } from './discount-usage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountUsage])],
  providers: [DiscountUsageService],
  controllers: [DiscountUsageController],
  exports: [DiscountUsageService],
})
export class DiscountUsageModule {}
