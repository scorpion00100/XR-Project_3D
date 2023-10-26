// table.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async createTable(tableData: Partial<Table>): Promise<Table> {
    const table = this.tableRepository.create(tableData);
    return await this.tableRepository.save(table);
  }

  async getTableById(tableId: number): Promise<Table> {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
    });
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    return table;
  }

  async getAllTables(): Promise<Table[]> {
    return await this.tableRepository.find();
  }

  async updateTable(
    tableId: number,
    tableData: Partial<Table>,
  ): Promise<Table> {
    await this.getTableById(tableId);
    await this.tableRepository.update(tableId, tableData);
    return this.getTableById(tableId);
  }

  async deleteTable(tableId: number): Promise<void> {
    await this.getTableById(tableId);
    await this.tableRepository.delete(tableId);
  }
}
