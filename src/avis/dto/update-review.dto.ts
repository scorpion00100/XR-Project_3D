import {
  IsInt,
  IsString,
  Max,
  Min,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PlatformOrigin } from '../avis.entity';

export class UpdateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  evaluation?: number;

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
  @IsOptional()
  plateformeOrigine?: PlatformOrigin;
}
