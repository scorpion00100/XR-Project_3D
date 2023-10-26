// table.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TableService } from './table.service';
import { Table } from './table.entity';
import { CreateTableDto, UpdateTableDto } from './dto/table.dto';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  getAllTables(): Promise<Table[]> {
    return this.tableService.getAllTables();
  }

  @Get(':id')
  getTableById(@Param('id') id: string): Promise<Table> {
    return this.tableService.getTableById(Number(id));
  }

  @Post()
  createTable(@Body() tableData: CreateTableDto): Promise<Table> {
    return this.tableService.createTable(tableData);
  }

  @Put(':id')
  updateTable(
    @Param('id') id: string,
    @Body() tableData: UpdateTableDto,
  ): Promise<Table> {
    return this.tableService.updateTable(Number(id), tableData);
  }

  @Delete(':id')
  deleteTable(@Param('id') id: string): Promise<void> {
    return this.tableService.deleteTable(Number(id));
  }
}
