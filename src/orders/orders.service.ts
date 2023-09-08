import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  async findById(id: string): Promise<Order | undefined> {
    return this.orderRepository.findOne(id);
  }

  async findAllByUser(userId: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { userId } });
  }

  async updateStatus(orderId: string, newStatus: string): Promise<Order> {
    const order = await this.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }
    order.status = newStatus;
    return this.orderRepository.save(order);
  }

  async findOrdersByStatus(status: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { status } });
  }

  async findOrdersByDate(date: Date): Promise<Order[]> {
    return this.orderRepository.find({
      where: { date },
      order: { date: 'ASC' },
    });
  }
}
