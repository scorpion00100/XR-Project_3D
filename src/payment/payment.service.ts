/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/payment.dto';
import Stripe from 'stripe'; // Importez la bibliothèque Stripe Node.js

@Injectable()
export class PaymentService {
  private stripe = new Stripe('votre_clé_secrète_stripe'); // Remplacez par votre clé secrète Stripe

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  async getPaymentById(id: string): Promise<Payment | undefined> {
    try {
      return await this.paymentRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Gérer l'erreur de non-existence de l'entité
        return undefined;
      } else {
        // Gérer d'autres erreurs ici
        throw error;
      }
    }
  }

  async applyPaymentToInvoice(
    paymentId: string,
    invoiceId: string,
  ): Promise<void> {
    const payment = await this.getPaymentById(paymentId);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Implémentez ici la logique d'application du paiement à la facture
  }
}*/
