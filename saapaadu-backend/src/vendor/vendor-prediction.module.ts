import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorPrediction } from './vendor-prediction.entity';
import { VendorPredictionService } from './vendor-prediction.service';
import { VendorPredictionController } from './vendor-prediction.controller';
import { Vendor } from '../vendor/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VendorPrediction, Vendor])],
  providers: [VendorPredictionService],
  controllers: [VendorPredictionController],
})
export class VendorPredictionModule {}
