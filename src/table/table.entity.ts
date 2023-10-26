// table.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tableNumber: number;

  @Column({ unique: true })
  qrCode: string;

  @Column({ default: 'Libre' }) // 'Libre', 'occupée', 'réservée', etc.
  status: string;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
}
