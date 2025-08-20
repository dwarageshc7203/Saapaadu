import { IsEmail, IsString, IsEnum } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['customer', 'vendor', 'admin'])
  role: 'customer' | 'vendor' | 'admin';
}
