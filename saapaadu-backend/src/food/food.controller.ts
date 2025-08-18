import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post(':vendorId')
  createFood(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Body() body: any,
  ) {
    return this.foodService.listFood(vendorId, body);
  }

  @Get('nearby')
  getNearby(
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
    @Query('area') area?: string,
  ) {
    return this.foodService.getNearbyFoods(lat, lng, area);
  }

  @Get('vendor/:vendorId')
  getVendorFoods(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.foodService.getVendorFoods(vendorId);
  }

  @Post('soldout/:foodId')
  markSold(@Param('foodId', ParseIntPipe) foodId: number) {
    return this.foodService.markSoldOut(foodId);
  }
}
