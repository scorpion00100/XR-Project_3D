import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/table.dto';

@Controller('api/tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  getAllTables() {
    return this.tableService.getAllTables();
  }

  @Get(':id')
  getTableById(@Param('id') id: string) {
    return this.tableService.getTableById(id);
  }

  @Post()
  createTable(@Body() createTableDto: CreateTableDto) {
    return this.tableService.createTable(createTableDto);
  }

  @Put(':id')
  updateTable(@Param('id') id: string, @Body() updateTableDto: CreateTableDto) {
    return this.tableService.updateTable(id, updateTableDto);
  }

  @Delete(':id')
  deleteTable(@Param('id') id: string) {
    return this.tableService.deleteTable(id);
  }
}
