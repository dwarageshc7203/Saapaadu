import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { Repository } from 'typeorm';
import { Vendor } from 'src/vendor/vendor.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepo: Repository<Food>,
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async listFood(vendorId: number, data: Partial<Food>) {
    const vendor = await this.vendorRepo.findOne({ where: { vendor_id: vendorId } });
    if (!vendor) throw new NotFoundException('Vendor not found');

    const food = this.foodRepo.create({ ...data, vendor });
    return this.foodRepo.save(food);
  }

  async getNearbyFoods(lat?: number, lng?: number, area?: string) {
    if (lat && lng) {
      // Haversine distance for 5km
      return this.foodRepo
        .createQueryBuilder('food')
        .leftJoinAndSelect('food.vendor', 'vendor')
        .where(`(6371 * acos(cos(radians(:lat)) * cos(radians(food.latitude)) * cos(radians(food.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(food.latitude)))) < 5`, {
          lat,
          lng,
        })
        .andWhere('food.is_sold_out = false')
        .getMany();
    } else if (area) {
      return this.foodRepo.find({
        where: {
          area,
          is_sold_out: false,
        },
        relations: ['vendor'],
      });
    }

    return []; // No valid input
  }

  async markSoldOut(foodId: number) {
    const food = await this.foodRepo.findOne({ where: { food_id: foodId } });
    if (!food) throw new NotFoundException('Food item not found');

    food.is_sold_out = true;
    return this.foodRepo.save(food);
  }

  async getVendorFoods(vendorId: number) {
    return this.foodRepo.find({
      where: { vendor: { vendor_id: vendorId } },
      order: { created_at: 'DESC' },
    });
  }
}
