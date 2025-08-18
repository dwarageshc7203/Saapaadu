import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { HotspotService } from './hotspot.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateHotspotDto } from './dto/create-hotspot.dto';

@Controller('hotspots')
export class HotspotController {
  constructor(private readonly hotspotService: HotspotService) {}

  // Public: customers can see all hotspots
  @Get()
  async getAll() {
    return this.hotspotService.findAll();
  }

  // Vendor: view own hotspots
  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyHotspots(@Req() req) {
    return this.hotspotService.findByVendor(req.user.uid);
  }

  // Vendor: create new hotspot
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() dto: CreateHotspotDto) {
    return this.hotspotService.create(req.user.uid, dto);
  }
}
