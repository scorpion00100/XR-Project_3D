import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async getInvoiceById(id: number): Promise<Invoice | undefined> {
    try {
      return await this.invoiceRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return undefined;
      } else {
        throw error;
      }
    }
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(createInvoiceDto);
    return this.invoiceRepository.save(invoice);
  }
}
