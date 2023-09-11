import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findByStatus(status: string): Promise<Order[]> {
    return this.createQueryBuilder('order')
      .where('order.status = :status', { status })
      .getMany();
  }

  async findByDate(date: Date): Promise<Order[]> {
    return this.createQueryBuilder('order')
      .where('order.createdAt >= :date', { date })
      .orderBy('order.createdAt', 'ASC')
      .getMany();
  }
}
