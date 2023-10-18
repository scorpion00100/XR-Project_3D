import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  cardToken: string; // Vous pouvez également ajouter d'autres informations nécessaires pour le paiement
}
