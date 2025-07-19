import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { VendorPrediction } from './vendor-prediction.entity';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { VendorPredictionService } from './vendor-prediction.service';
import { VendorPredictionController } from './vendor-prediction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, VendorPrediction])],
  providers: [VendorService, VendorPredictionService],
  controllers: [VendorController, VendorPredictionController],
})
export class VendorModule {}
