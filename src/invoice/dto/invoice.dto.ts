import { IsUUID, IsNumber, IsDate } from 'class-validator';

export class CreateInvoiceDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  totalAmount: number;

  @IsDate()
  date: Date;
}
