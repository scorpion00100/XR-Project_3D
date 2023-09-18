import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

export enum PlatformOrigin {
  WEB = 'web',
  GOOGLE = 'google',
}

export enum VerificationStatus {
  VERIFIED = 'verified',
  NOT_VERIFIED = 'not_verified',
  PENDING_VERIFICATION = 'pending_verification',
}

@Entity()
export class Avis {
  @PrimaryGeneratedColumn()
  id: number | string;

  @ManyToOne(() => User, (user) => user.avis)
  user: User;

  @ManyToOne(() => Product, (product) => product.avis)
  product: Product;

  @Column({ type: 'smallint' })
  evaluation: number;

  @Column({ type: 'text', nullable: true })
  commentaire: string;

  @Column({ type: 'int', nullable: true })
  experienceAREvaluee: number | null;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'enum', enum: ['web', 'google'] })
  plateformeOrigine: 'web' | 'google';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSoumission: Date;

  @Column({
    type: 'enum',
    enum: ['verified', 'not_verified', 'pending_verification'],
    default: 'not_verified',
  })
  statutVerification: VerificationStatus;
}
