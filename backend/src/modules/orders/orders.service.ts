import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async create(cid: number, dto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepo.create({ ...dto, cid });
    return this.orderRepo.save(order);
  }

  async findByCustomer(cid: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { cid },
      relations: ['hotspot', 'hotspot.vendor'],
    });
  }

  async findByVendor(vid: number): Promise<Order[]> {
    return this.orderRepo
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.hotspot', 'hotspot')
      .innerJoinAndSelect('hotspot.vendor', 'vendor')
      .where('vendor.vid = :vid', { vid })
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
