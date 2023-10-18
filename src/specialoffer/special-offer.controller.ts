import { Controller, Get, Post, Body } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';
import { CreateSpecialOfferDto } from './dto/special-offer.dto';
import { SpecialOffer } from './special-offer.entity';

@Controller('api/specials')
export class SpecialOfferController {
  constructor(private readonly specialOfferService: SpecialOfferService) {}

  @Get()
  async getAllSpecialOffers(): Promise<SpecialOffer[]> {
    return this.specialOfferService.getAllSpecialOffers();
  }

  @Post()
  async createSpecialOffer(
    @Body() createSpecialOfferDto: CreateSpecialOfferDto,
  ): Promise<SpecialOffer> {
    return this.specialOfferService.createSpecialOffer(createSpecialOfferDto);
  }
}
