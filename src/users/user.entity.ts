import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'client' })
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({ default: 0 })
  loyaltyPoints: number;

  @Column({ type: 'jsonb', default: {} })
  arPreferences: Record<string, any>;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
