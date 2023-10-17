import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Avis } from '../avis/avis.entity';
import * as bcrypt from 'bcrypt'; // Importer bcrypt pour gérer le hachage du mot de passe

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

  @Column({ nullable: true }) // Nouvelle colonne pour la date de naissance
  date_naissance: Date | null;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Avis, (avis) => avis.user)
  avis: Avis[];

  @Column({ default: 0 })
  loyaltyPoints: number;

  @Column({ type: 'jsonb', default: {} })
  arPreferences: Record<string, any>;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  // Méthode pour comparer le mot de passe entré avec le mot de passe haché dans la base de données
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
