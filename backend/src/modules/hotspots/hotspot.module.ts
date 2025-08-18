import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotspot } from './entities/hotspot.entity';
import { HotspotService } from './hotspot.service';
import { HotspotController } from './hotspot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hotspot])],
  providers: [HotspotService],
  controllers: [HotspotController],
  exports: [HotspotService],
})
export class HotspotModule {}
