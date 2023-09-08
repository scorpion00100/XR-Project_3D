import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findByStatus(status: string): Promise<Order[]> {
    return this.find({ where: { status } });
  }

  async findByDate(date: Date): Promise<Order[]> {
    return this.find({ where: { date }, order: { date: 'ASC' } });
  }
}
