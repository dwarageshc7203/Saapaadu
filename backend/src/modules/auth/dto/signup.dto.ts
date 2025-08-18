import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class SignupDto {
  @IsString() @IsNotEmpty() username: string;
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() password: string;
  @IsIn(['customer', 'vendor', 'admin']) role: 'customer' | 'vendor' | 'admin';

  // common (customer/vendor)
  @IsOptional() @IsString() phoneNumber?: string;
  @IsOptional() @IsIn(['veg', 'nonveg']) veg_nonveg?: 'veg' | 'nonveg';
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() area?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;

  // vendor-specific
  @IsOptional() @IsString() shopName?: string;
  @IsOptional() @IsString() shopAddress?: string;
  @IsOptional() @IsNumber() latitude?: number;
  @IsOptional() @IsNumber() longitude?: number;
  @IsOptional() @IsString() shopImage?: string;
}
