// backend/src/modules/hotspots/dto/create-hotspot.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateHotspotDto {
  @IsString()
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
