import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsNotEmpty()
  user_id: number; // Foreign key to the users table
}
