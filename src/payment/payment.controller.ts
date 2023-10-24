// payment.controller.ts
/*import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Controller('api/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async makePayment(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.createPayment(createPaymentDto);
    // Utilisez Stripe pour effectuer le paiement ici
    // Stripe vous permet d'effectuer un paiement en utilisant le token de carte de crédit du client
    // Vous devez configurer Stripe pour accepter les paiements en utilisant un token ou un numéro de carte de crédit
    // Stripe.createCharge({ amount: payment.amount, source: createPaymentDto.cardToken, currency: 'usd' });
    return payment;
  }
}
*/
