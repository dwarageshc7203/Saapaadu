import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Food } from 'src/food/food.entity';
import { Customer } from 'src/customer/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Food) private foodRepo: Repository<Food>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async placeOrder(data: {
    customer_id: number;
    food_id: number;
    quantity: number;
  }) {
    const customer = await this.customerRepo.findOneBy({ customer_id: data.customer_id });
    const food = await this.foodRepo.findOneBy({ food_id: data.food_id });

    if (!customer || !food) {
      throw new NotFoundException('Customer or Food not found');
    }

    const total_price = Number(food.discounted_price) * data.quantity;

    const order = this.orderRepo.create({
      customer,
      food,
      quantity: data.quantity,
      total_price,
    });

    return this.orderRepo.save(order);
  }

  async getOrdersForVendor(vendor_id: number) {
    return this.orderRepo.find({
      relations: ['food', 'food.vendor', 'customer'],
      where: { food: { vendor: { vendor_id } } },
    });
  }

  async getOrdersForCustomer(customer_id: number) {
    return this.orderRepo.find({
      relations: ['food', 'customer'],
      where: { customer: { customer_id } },
    });
  }

  async bookMeal(food_id: number, customer_id: number) {
  const food = await this.foodRepo.findOne({
    where: { food_id },
    relations: ['vendor'],
  });
  const customer = await this.customerRepo.findOneBy({ customer_id });

  if (!food || !customer) throw new NotFoundException('Food or Customer not found');

  const order = this.orderRepo.create({
    food,
    customer,
    quantity: 1, // default 1
    total_price: Number(food.discounted_price),
  });

  return this.orderRepo.save(order);
}

}
