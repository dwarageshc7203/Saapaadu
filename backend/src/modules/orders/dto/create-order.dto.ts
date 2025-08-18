import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  hid: number; // hotspot ID

  @IsString()
  mealName: string;

  @IsNumber()
  mealCount: number;

  @IsNumber()
  price: number;
}
