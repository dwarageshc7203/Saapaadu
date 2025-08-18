import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VendorPredictionService } from './vendor-prediction.service';
import { CreateVendorPredictionDto } from './dto/create-vendor-prediction.dto';

@Controller('vendors/:vendorId/predictions')
export class VendorPredictionController {
  constructor(private readonly predictionService: VendorPredictionService) {}

  @Post()
  create(
    @Param('vendorId') vendorId: number,
    @Body() dto: CreateVendorPredictionDto,
  ) {
    return this.predictionService.create(vendorId, dto);
  }

  @Get()
  findByVendor(@Param('vendorId') vendorId: number) {
    return this.predictionService.findByVendor(vendorId);
  }
}
