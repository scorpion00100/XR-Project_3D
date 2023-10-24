import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { Invoice } from './invoice.entity';

@Controller('api/invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':id')
  async getInvoiceById(@Param('id') id: number): Promise<Invoice> {
    return this.invoiceService.getInvoiceById(id);
  }

  @Post()
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<Invoice> {
    return this.invoiceService.createInvoice(createInvoiceDto);
  }
}
