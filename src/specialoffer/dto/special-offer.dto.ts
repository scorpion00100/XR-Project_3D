import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSpecialOfferDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
