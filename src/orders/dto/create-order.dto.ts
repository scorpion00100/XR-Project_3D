import { IsUUID, IsEnum, IsString, ArrayUnique } from 'class-validator';
import { OrderStatus } from '../order.entity';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @ArrayUnique()
  @IsUUID('4', { each: true })
  products: string[];

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString()
  chosenArExperience: string;
}
