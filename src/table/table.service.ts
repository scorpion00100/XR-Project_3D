import { Injectable } from '@nestjs/common';
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

  getTableById(id: string) {
    return this.tableRepository.findOne(id);
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
