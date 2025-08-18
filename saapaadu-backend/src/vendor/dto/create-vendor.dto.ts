import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  user: any;

  @IsNotEmpty()
  @IsString()
  hotel_name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsString()
  fssai_number?: string;
}
