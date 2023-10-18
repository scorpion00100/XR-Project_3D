import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Table } from '../table/table.entity';
import { Payment } from '../payment/payment.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalAmount: number;

  @ManyToOne(() => Table, (table) => table.invoices)
  table: Table;

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments: Payment[];
}
