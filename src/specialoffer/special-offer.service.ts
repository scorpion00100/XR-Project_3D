import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialOffer } from './special-offer.entity';
import { CreateSpecialOfferDto } from './dto/special-offer.dto';

@Injectable()
export class SpecialOfferService {
  constructor(
    @InjectRepository(SpecialOffer)
    private readonly specialOfferRepository: Repository<SpecialOffer>,
  ) {}

  async getAllSpecialOffers(): Promise<SpecialOffer[]> {
    return this.specialOfferRepository.find();
  }

  async createSpecialOffer(
    createSpecialOfferDto: CreateSpecialOfferDto,
  ): Promise<SpecialOffer> {
    const specialOffer = this.specialOfferRepository.create(
      createSpecialOfferDto,
    );
    return this.specialOfferRepository.save(specialOffer);
  }
}
