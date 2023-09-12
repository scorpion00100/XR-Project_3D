import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity'; // Importez OrderStatus depuis votre order.entity
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../users/user.entity'; // Importez User depuis votre user.entity
import { Product } from '../products/product.entity'; // Importez Product depuis votre product.entity

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) // Injectez le référencement UserRepository
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product) // Injectez le référencement ProductRepository
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createOrderDto.userId },
      });
      if (!user) {
        throw new NotFoundException(
          `Utilisateur avec l'ID ${createOrderDto.userId} non trouvé.`,
        );
      }

      const products = await this.productRepository.findByIds(
        createOrderDto.products,
      );
      if (products.length !== createOrderDto.products.length) {
        throw new NotFoundException(
          'Certains produits spécifiés ne peuvent pas être trouvés.',
        );
      }

      const order = new Order();
      order.user = user;
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
