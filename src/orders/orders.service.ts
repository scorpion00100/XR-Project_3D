import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const products = await this.orderRepository.manager
        .createQueryBuilder(Product, 'product')
        .whereInIds(createOrderDto.products)
        .getMany();

      if (products.length !== createOrderDto.products.length) {
        throw new NotFoundException(
          'Certains produits spécifiés ne peuvent pas être trouvés.',
        );
      }

      const order = new Order();
      order.products = products;
      order.status = createOrderDto.status;
      order.chosenArExperience = createOrderDto.chosenArExperience;

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
      return this.orderRepository
        .createQueryBuilder('order')
        .innerJoin('order.user', 'user')
        .where('user.id = :userId', { userId })
        .getMany();
    } catch (error) {
      throw new BadRequestException(
        "Impossible de récupérer les commandes de l'utilisateur.",
      );
    }
  }

  async updateStatus(orderId: string, newStatus: OrderStatus): Promise<Order> {
    try {
      const order = await this.findById(orderId);
      if (!order) {
        throw new NotFoundException(
          `Commande avec l'ID ${orderId} non trouvée.`,
        );
      }
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
