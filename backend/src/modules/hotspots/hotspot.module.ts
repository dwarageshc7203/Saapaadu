import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotspot } from './entities/hotspot.entity';
import { HotspotsService } from './hotspot.service';
import { HotspotsController } from './hotspot.controller';
import { Vendor } from '../vendor/entities/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotspot, Vendor])],
  providers: [HotspotsService],
  controllers: [HotspotsController],
  exports: [HotspotsService],
})
export class HotspotModule {}
