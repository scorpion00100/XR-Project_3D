import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Invoice } from '../invoice/invoice.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amountPaid: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.payments)
  invoice: Invoice;
}
