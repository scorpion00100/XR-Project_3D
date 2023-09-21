import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { AvisService } from './avis.service';
import { Avis } from './avis.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Avis> {
    return await this.avisService.create(createReviewDto);
  }

  @Get('product/:productId')
  async findAllByProduct(
    @Param('productId') productId: number,
  ): Promise<Avis[]> {
    return await this.avisService.findAllByProduct(productId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Avis> {
    const userId = 1; // Remplacez par l'ID de l'utilisateur authentifié
    return await this.avisService.update(id, updateReviewDto, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const userId = 1; // Remplacez par l'ID de l'utilisateur authentifié
    return await this.avisService.delete(id, userId);
  }
}
