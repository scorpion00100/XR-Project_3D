import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { PlatformOrigin } from '../avis.entity';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  evaluation: number;

  @IsString()
  @IsOptional()
  commentaire?: string;

  @IsInt()
  @IsOptional()
  experienceAREvaluee?: number;

  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @IsEnum(PlatformOrigin)
  @IsNotEmpty()
  plateformeOrigine: PlatformOrigin;
}
