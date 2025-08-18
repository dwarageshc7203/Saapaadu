import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendor')
@UseGuards(JwtAuthGuard)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    return this.vendorService.findByUid(req.user.uid);
  }

  @Put('profile')
  async updateProfile(@Req() req, @Body() dto: UpdateVendorDto) {
    return this.vendorService.update(req.user.uid, dto);
  }
}
