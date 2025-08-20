import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  hid: number; // hotspot ID

  @IsNumber()
  quantity: number;
}
