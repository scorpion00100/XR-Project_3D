import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn, // Ajout de cette ligne pour mettre à jour la date
} from 'typeorm';

import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

export enum OrderStatus {
  PENDING = 'En attente',
  IN_PROGRESS = 'En cours',
  COMPLETED = 'Terminé',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products: Product[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn() // Ajout de cette ligne pour mettre à jour la date
  updatedAt: Date; // Ajout de cette ligne pour mettre à jour la date

  @Column({ nullable: true })
  chosenArExperience: string; // Vous pouvez lier ceci à une table d'expériences AR si nécessaire
}
