import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Vendor } from 'src/vendor/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Vendor])],
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
