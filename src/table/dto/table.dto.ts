// table.dto.ts

import { IsNumber, IsString } from 'class-validator';

export class CreateTableDto {
  @IsNumber()
  tableNumber: number;

  @IsString()
  qrCode: string;
}

export class UpdateTableDto {
  @IsNumber()
  tableNumber: number;

  @IsString()
  qrCode: string;

  @IsString()
  status: string; // Statut de la table
}
