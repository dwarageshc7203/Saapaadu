import { IsString, IsIn, IsPhoneNumber } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsPhoneNumber('IN') // for Indian numbers, change 'IN' to your region if needed
  phone_number: string;

  @IsIn(['customer', 'vendor'])
  role: 'customer' | 'vendor';
}
