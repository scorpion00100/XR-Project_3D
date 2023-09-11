import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = await this.ordersService.create(createOrderDto);
      return order;
    } catch (error) {
      throw new Error('Impossible de créer la commande.');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order | undefined> {
    try {
      const order = await this.ordersService.findById(id);
      if (!order) {
        throw new Error('Commande introuvable.');
      }
      return order;
    } catch (error) {
      throw new Error('Impossible de récupérer la commande.');
    }
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Order[]> {
    try {
      const orders = await this.ordersService.findAllByUser(userId);
      return orders;
    } catch (error) {
      throw new Error(
        "Impossible de récupérer les commandes de l'utilisateur.",
      );
    }
  }
}
