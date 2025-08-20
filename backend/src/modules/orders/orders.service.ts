import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Hotspot } from '../hotspots/entities/hotspot.entity';
import { Customer } from '../customer/entities/customer.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrderService {
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

  async findByCustomer(cid: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { cid },
      relations: ['hotspot', 'hotspot.vendor'],
    });
  }

  async findByVendor(uid: number): Promise<Order[]> {
    return this.orderRepo
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.hotspot', 'hotspot')
      .innerJoinAndSelect('hotspot.vendor', 'vendor')
      .where('vendor.uid = :uid', { uid })
      .getMany();
  }

async update(oid: number, attrs: Partial<Order>): Promise<Order | null> {
  await this.orderRepo.update(oid, attrs);
  return this.orderRepo.findOne({
    where: { oid },
    relations: ['hotspot', 'hotspot.vendor'],
  });
}
}
