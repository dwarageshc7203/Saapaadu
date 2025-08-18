import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { HotspotsService } from './hotspot.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('hotspots')
export class HotspotsController {
  constructor(private readonly service: HotspotsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: any) {
    // assume vendor user; you can add a RolesGuard('vendor') if needed
    return this.service.createFromVendor(req.user.sub, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: any) {
    return this.service.updateForVendor(req.user.sub, +id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.service.removeForVendor(req.user.sub, +id);
  }
}
