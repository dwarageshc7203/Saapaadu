import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controler';
import { Hotspot } from '../hotspots/entities/hotspot.entity';
import { Customer } from '../customer/entities/customer.entity';
import { User } from '../users/entities/user.entity';
import { Vendor } from '../vendor/entities/vendor.entity';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Hotspot, Customer, User, Vendor]), MailerModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
