import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.update(userId, { password: newPassword });
  }

  async findByRole(role: string): Promise<User[]> {
    return this.find({ where: { role } });
  }

  async userExists(userId: string): Promise<boolean> {
    const count = await this.count({ where: { id: userId } });
    return count > 0;
  }
}
