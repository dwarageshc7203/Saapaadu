import { IsEmail, IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsIn(['customer', 'vendor'])
  role: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  @IsIn(['veg', 'nonveg']) // ✅ enforce correct type
  veg_nonveg?: 'veg' | 'nonveg';

  @IsOptional()
  address?: string;

  @IsOptional()
  area?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;

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
