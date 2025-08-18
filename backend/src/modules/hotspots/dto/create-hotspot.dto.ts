import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class CreateHotspotDto {
  @IsString() shopName: string;
  @IsString() shopAddress: string;

  @IsOptional() @IsString() area?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;

  @IsOptional() @IsNumber() latitude?: number;
  @IsOptional() @IsNumber() longitude?: number;

  @IsOptional() @IsString() shopImage?: string;

  @IsOptional() @IsIn(['veg', 'nonveg'])
  veg_nonveg?: 'veg' | 'nonveg';

  @IsString() mealName: string;
  @IsNumber() mealCount: number;
  @IsNumber() price: number;

  @IsOptional() @IsString() duration?: string;
}
