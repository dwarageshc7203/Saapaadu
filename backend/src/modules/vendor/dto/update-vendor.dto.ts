import { IsOptional, IsString, IsIn, IsBoolean, IsNumber } from 'class-validator';

export class UpdateVendorDto {
  @IsOptional() @IsString() phoneNumber?: string;

  @IsOptional()
  @IsIn(['veg', 'nonveg'])
  veg_nonveg?: 'veg' | 'nonveg';

  @IsOptional() @IsString() shopName?: string;
  @IsOptional() @IsString() shopAddress?: string;
  @IsOptional() @IsString() area?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;

  @IsOptional() @IsNumber() latitude?: number;
  @IsOptional() @IsNumber() longitude?: number;

  @IsOptional() @IsString() shopImage?: string;
  @IsOptional() @IsBoolean() verification?: boolean;
}
