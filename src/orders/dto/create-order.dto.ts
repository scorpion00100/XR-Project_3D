import { IsUUID, IsEnum } from 'class-validator';
import { OrderStatus } from '../order.entity';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsUUID('4', { each: true })
  products: string[];

  @IsEnum(OrderStatus)
  status: OrderStatus;

  chosenArExperience: string;
}
