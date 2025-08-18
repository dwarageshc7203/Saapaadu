import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  vendor: any;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  original_price: number;

  @IsNumber()
  discounted_price: number;

  @IsString()
  expiry_time: string;
}
