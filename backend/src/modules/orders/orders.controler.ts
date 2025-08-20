import { 
  Controller, Post, Get, Body, Req, UseGuards, ParseIntPipe, 
  Param, Patch, UsePipes, ValidationPipe 
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Customer: place a new order
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Req() req, @Body() dto: CreateOrderDto) {
    return this.orderService.create(req.user.uid, dto);
  }

  // Customer: view my orders
  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyOrders(@Req() req) {
    return this.orderService.findByCustomer(req.user.uid);
  }

  // Vendor: view all orders for my hotspots
  @UseGuards(JwtAuthGuard)
  @Get('vendor/my')
  async getVendorOrders(@Req() req) {
    return this.orderService.findByVendor(req.user.uid);
  }

  // Update order (customer/vendor/admin depending on rules)
  @UseGuards(JwtAuthGuard)
  @Patch(':oid')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateOrder(
    @Param('oid', ParseIntPipe) oid: number,
    @Body() dto: UpdateOrderDto,
    @Req() req,
  ) {
    // ⚠️ Ownership check could go here (customer/vendor)
    return this.orderService.update(oid, dto);
  }
}
