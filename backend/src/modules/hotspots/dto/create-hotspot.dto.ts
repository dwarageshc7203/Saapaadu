// backend/src/modules/hotspots/dto/create-hotspot.dto.ts
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateHotspotDto {
  @IsString()
  shopName: string;

  @IsString()
  shopAddress: string;

  @IsString()
  area: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  shopImage?: string;

  @IsEnum(['veg', 'nonveg'])
  veg_nonveg: 'veg' | 'nonveg';

  @IsString()
  mealName: string;

  @IsNumber()
  mealCount: number;

  @IsNumber()
  price: number;

  // Duration in minutes
  @IsNumber()
  duration: number;
}
