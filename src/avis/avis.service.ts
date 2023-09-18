import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avis } from './avis.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(Avis)
    private readonly avisRepository: Repository<Avis>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Avis> {
    const newAvis = this.avisRepository.create(createReviewDto);
    return await this.avisRepository.save(newAvis);
  }

  async findAllByProduct(productId: number): Promise<Avis[]> {
    return await this.avisRepository.find({
      where: { product: { id: productId } },
    });
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
    userId: number,
  ): Promise<Avis> {
    const avis = await this.avisRepository.findOne({ where: { id: id } });
    if (!avis) {
      throw new NotFoundException('Avis non trouvé');
    }
    if (avis.user.id !== userId) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à mettre à jour cet avis",
      );
    }
    Object.assign(avis, updateReviewDto);
    return await this.avisRepository.save(avis);
  }

  async delete(id: number, userId: number): Promise<void> {
    const avis = await this.avisRepository.findOne({ where: { id: id } });
    if (!avis) {
      throw new NotFoundException('Avis non trouvé');
    }
    if (avis.user.id !== userId) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à supprimer cet avis",
      );
    }
    await this.avisRepository.remove(avis);
  }
}
