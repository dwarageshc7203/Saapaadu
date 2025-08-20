import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Hotspot } from '../hotspots/entities/hotspot.entity';
import { Customer } from '../customer/entities/customer.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrderService {
  orderRepository: any;
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Hotspot)
    private hotspotRepo: Repository<Hotspot>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(uid: number, dto: CreateOrderDto): Promise<Order> {
    // Ensure a customer record exists for this uid
    let customer = await this.customerRepo.findOne({ where: { uid } });
    if (!customer) {
      const user = await this.userRepo.findOne({ where: { id: uid } });
      if (!user) throw new NotFoundException('User not found');
      customer = this.customerRepo.create({ uid, user, username: user.username || user.email });
      customer = await this.customerRepo.save(customer);
    }

    const hotspot = await this.hotspotRepo.findOne({ where: { hid: dto.hid } });
    if (!hotspot) throw new NotFoundException('Hotspot not found');

    const totalPrice = Number(hotspot.price) * dto.quantity;
    const order = this.orderRepo.create({
      cid: customer.cid,
      hid: hotspot.hid,
      vid: hotspot.vid,
      quantity: dto.quantity,
      totalPrice,
    });
    const saved = await this.orderRepo.save(order);

    // Reduce available meals in the hotspot
    if (typeof hotspot.mealCount === 'number') {
      hotspot.mealCount = Math.max(0, (hotspot.mealCount as number) - dto.quantity);
      await this.hotspotRepo.save(hotspot);
    }

    return saved;
  }

// backend/src/modules/orders/orders.service.ts

async findByCustomer(uid: number) {
  const customer = await this.customerRepo.findOne({ where: { uid } });
  if (!customer) return [];

  const orders = await this.orderRepo.find({
    where: { cid: customer.cid },
    relations: ['hotspot', 'hotspot.vendor'],
    order: { createdAt: 'DESC' },
  });

  return orders.map(order => ({
    oid: order.oid,
    status: order.status,
    quantity: order.quantity,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt,

    // hotspot fields
    mealName: order.hotspot.mealName,
    mealCount: order.hotspot.mealCount,
    price: order.hotspot.price,
    shopName: order.hotspot.shopName,
    shopAddress: order.hotspot.shopAddress,
    vendorName: order.hotspot.vendor?.shopName ?? order.hotspot.vendor?.username,
  }));
}


async findByVendor(uid: number) {
  const orders = await this.orderRepo
    .createQueryBuilder('order')
    .innerJoinAndSelect('order.hotspot', 'hotspot')
    .innerJoinAndSelect('hotspot.vendor', 'vendor')
    .innerJoinAndSelect('order.customer', 'customer') // 👈 include customer
    .where('vendor.uid = :uid', { uid })
    .orderBy('order.createdAt', 'DESC')
    .getMany();

  return orders.map(order => ({
    oid: order.oid,
    status: order.status,
    quantity: order.quantity,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt?.toISOString(), // 👈 ensure valid date string

    mealName: order.hotspot.mealName,
    mealCount: order.hotspot.mealCount,
    price: order.hotspot.price,
    shopName: order.hotspot.shopName,
    shopAddress: order.hotspot.shopAddress,

    customerName: order.customer?.username ?? `Customer #${order.cid}`,
  }));
}



  // Fixed update method - this was causing the original error
async update(oid: number, updateData: UpdateOrderDto | Partial<Order>): Promise<Order | null> {
  // Validate that updateData is not empty
  if (!updateData || Object.keys(updateData).length === 0) {
    throw new BadRequestException('Update data cannot be empty');
  }

    // Use the repository.update method (simpler and more reliable)
    const result = await this.orderRepo.update({ oid }, updateData);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${oid} not found`);
    }

    // Return the updated order with relations
    return this.orderRepo.findOne({
      where: { oid },
      relations: ['hotspot', 'hotspot.vendor', 'customer'],
    });
  }

  // Alternative update method using QueryBuilder (if you prefer)
async updateWithQueryBuilder(oid: number, updateData: UpdateOrderDto | Partial<Order>): Promise<Order | null> {
  if (!updateData || Object.keys(updateData).length === 0) {
    throw new BadRequestException('Update data cannot be empty');
  }

  const result = await this.orderRepo
    .createQueryBuilder()
    .update(Order)
    .set(updateData)  // <- THIS LINE WAS MISSING IN YOUR CODE
    .where('oid = :oid', { oid })
    .execute();

  if (result.affected === 0) {
    throw new NotFoundException(`Order with ID ${oid} not found`);
  }

  return this.orderRepo.findOne({
    where: { oid },
    relations: ['hotspot', 'hotspot.vendor', 'customer'],
  });
}

  // Additional helper methods
  async findOne(oid: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { oid },
      relations: ['hotspot', 'hotspot.vendor', 'customer'],
    });
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${oid} not found`);
    }
    
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['hotspot', 'hotspot.vendor', 'customer'],
    });
  }

  async remove(oid: number): Promise<void> {
    const result = await this.orderRepo.delete({ oid });
    
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${oid} not found`);
    }
  }

  // Method to update order status specifically
  async updateStatus(oid: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled'): Promise<Order> {
    const order = await this.findOne(oid);
    
    order.status = status;
    await this.orderRepo.save(order);
    
    return order;
  }

  async getMyOrders(customerId: number) {
  return this.orderRepo.find({
    where: { cid: customerId },
    relations: ['hotspot', 'vendor', 'customer'],
    order: { createdAt: 'DESC' }
  });
}

}