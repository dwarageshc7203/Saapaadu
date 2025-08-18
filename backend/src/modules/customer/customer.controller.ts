import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    return this.customerService.findByUid(req.user.uid);
  }

  @Put('profile')
  async updateProfile(@Req() req, @Body() dto: UpdateCustomerDto) {
    return this.customerService.update(req.user.uid, dto);
  }
}
