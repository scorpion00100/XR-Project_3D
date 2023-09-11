import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = this.orderRepository.create({
        // Mappez les propriétés de createOrderDto ici
      });
      return this.orderRepository.save(order);
    } catch (error) {
      throw new BadRequestException('Impossible de créer la commande.');
    }
  }

  async findById(id: string): Promise<Order | undefined> {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException(`Commande introuvable.`);
      }
      return order;
    } catch (error) {
      throw new BadRequestException('Impossible de récupérer la commande.');
    }
  }

  async findAllByUser(userId: string): Promise<Order[]> {
    try {
      return this.orderRepository.find({ where: { user: { id: userId } } });
    } catch (error) {
      throw new BadRequestException(
        "Impossible de récupérer les commandes de l'utilisateur.",
      );
    }
  }

  async updateStatus(orderId: string, newStatus: OrderStatus): Promise<Order> {
    try {
      const order = await this.findById(orderId);
      order.status = newStatus;
      return this.orderRepository.save(order);
    } catch (error) {
      throw new BadRequestException(
        `Commande avec l'ID ${orderId} non trouvée.`,
      );
    }
  }

  async findOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    try {
      return this.orderRepository.find({ where: { status } });
    } catch (error) {
      throw new BadRequestException(
        'Impossible de récupérer les commandes par statut.',
      );
    }
  }

  async findOrdersByDate(date: Date): Promise<Order[]> {
    try {
      return this.orderRepository.find({
        where: { createdAt: date },
        order: { createdAt: 'ASC' },
      });
    } catch (error) {
      throw new BadRequestException(
        'Impossible de récupérer les commandes par date.',
      );
    }
  }
}
