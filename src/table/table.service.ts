import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';
import { CreateTableDto } from './dto/table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  getAllTables() {
    return this.tableRepository.find();
  }

  async getTableById(id: string): Promise<Table | undefined> {
    try {
      return await this.tableRepository.findOne({ where: { id } });
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

  createTable(createTableDto: CreateTableDto) {
    const table = this.tableRepository.create(createTableDto);
    return this.tableRepository.save(table);
  }

  updateTable(id: string, updateTableDto: CreateTableDto) {
    return this.tableRepository.update(id, updateTableDto);
  }

  deleteTable(id: string) {
    return this.tableRepository.delete(id);
  }
}
