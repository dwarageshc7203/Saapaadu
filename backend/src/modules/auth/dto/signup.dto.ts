import { IsEmail, IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsIn(['customer', 'vendor'])
  role: string;

  // ✅ Customer-specific
  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  veg_nonveg?: 'veg' | 'nonveg';
  
  @IsOptional()
  address?: string;

  @IsOptional()
  area?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;

  // ✅ Vendor-specific
  @IsOptional()
  shopName?: string;

  @IsOptional()
  shopAddress?: string;

  @IsOptional()
  latitude?: number;

  @IsOptional()
  longitude?: number;

  @IsOptional()
  shopImage?: string;
}
