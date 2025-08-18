import { IsString, IsIn } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsIn(['customer', 'vendor'])
  role: 'customer' | 'vendor';
}
