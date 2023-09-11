import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
