import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional() @IsString() phoneNumber?: string;

  @IsOptional()
  @IsIn(['veg', 'nonveg'])
  veg_nonveg?: 'veg' | 'nonveg';

  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() area?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;
}
