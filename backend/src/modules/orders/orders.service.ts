import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Hotspot } from '../hotspots/entities/hotspot.entity';
import { Customer } from '../customer/entities/customer.entity';
import { User } from '../users/entities/user.entity';
import { Vendor } from '../vendor/entities/vendor.entity';
import { MailerService } from '../mailer/mailer.service';

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
     @InjectRepository(Vendor)
     private readonly vendorRepo: Repository<Vendor>,
    private readonly mailerService: MailerService,   // ✅ Add this

  ) {}

async create(uid: number, dto: CreateOrderDto): Promise<Order> {
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

  if (typeof hotspot.mealCount === 'number') {
    hotspot.mealCount = Math.max(0, (hotspot.mealCount as number) - dto.quantity);
    await this.hotspotRepo.save(hotspot);
  }

  // 🔔 Send hotspot mail notifications
const customersInArea = await this.customerRepo.find({
  where: { area: hotspot.area },
  relations: ['user'],   // ✅ important, otherwise no emails
});


  this.mailerService.notifyCustomersForHotspot(
    customersInArea,
    hotspot.shopName,
    hotspot.mealName,
    hotspot.price,
    hotspot.area,
  ).catch(err => console.error('Mail error:', err));

  return saved;
}


// backend/src/modules/orders/orders.service.ts

async findByCustomer(uid: number) {
  const customer = await this.customerRepo.findOne({ where: { uid } });
  if (!customer) return [];

  const orders = await this.orderRepo.find({
    where: { cid: customer.cid },
    relations: ['customer', 'vendor', 'hotspot'], // ✅ use vendor directly
    order: { createdAt: 'DESC' },
  });

  return orders.map(order => ({
    oid: order.oid,
    status: order.status,
    quantity: order.quantity,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt,

    // hotspot fields
    mealName: order.hotspot?.mealName ?? null,
    mealCount: order.hotspot?.mealCount ?? null,
    price: order.hotspot?.price ?? null,
    shopName: order.hotspot?.shopName ?? null,
    shopAddress: order.hotspot?.shopAddress ?? null,

    // vendor fields (use order.vendor directly!)
    vendorName: order.vendor?.shopName ?? order.vendor?.username ?? null,
  }));
}

async findByVendor(uid: number) {
  const vendor = await this.vendorRepo.findOne({ where: { uid } });
  if (!vendor) return [];

  const orders = await this.orderRepo.find({
    where: { vid: vendor.vid },
    relations: ['customer', 'vendor', 'hotspot'], // ✅
    order: { createdAt: 'DESC' },
  });

  return orders.map(order => ({
    oid: order.oid,
    status: order.status,
    quantity: order.quantity,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt,

    mealName: order.hotspot?.mealName ?? null,
    mealCount: order.hotspot?.mealCount ?? null,
    price: order.hotspot?.price ?? null,
    shopName: order.hotspot?.shopName ?? null,
    shopAddress: order.hotspot?.shopAddress ?? null,

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