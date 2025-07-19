import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  place(@Body() body: { customer_id: number; food_id: number; quantity: number }) {
    return this.ordersService.placeOrder(body);
  }

  @Get('vendor/:id')
  vendorOrders(@Param('id') id: number) {
    return this.ordersService.getOrdersForVendor(id);
  }

  @Get('customer/:id')
  customerOrders(@Param('id') id: number) {
    return this.ordersService.getOrdersForCustomer(id);
  }

    @UseGuards(JwtAuthGuard)
  @Post('book')
  async book(@Body() body, @Request() req) {
    return this.ordersService.bookMeal(body.food_id, req.user.user_id);
  }
}
