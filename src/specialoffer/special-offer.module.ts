// special-offer.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialOffer } from './special-offer.entity';
import { SpecialOfferController } from './special-offer.controller';
import { SpecialOfferService } from './special-offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialOffer])],
  controllers: [SpecialOfferController],
  providers: [SpecialOfferService],
})
export class SpecialOfferModule {}
