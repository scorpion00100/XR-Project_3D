// table.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SpecialOffer } from '../specialoffer/special-offer.entity';
import { Invoice } from '../invoice/invoice.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tableNumber: string;

  @Column()
  qrCode: string;

  @Column()
  status: string; // Peut-être une énumération ("Free", "Occupied", "Reserved")

  @OneToMany(() => SpecialOffer, (specialOffer) => specialOffer.table)
  specialOffers: SpecialOffer[];

  @OneToMany(() => Invoice, (invoice) => invoice.table)
  invoices: Invoice[];
}
