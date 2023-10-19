import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Importer la bibliothèque de hachage bcrypt

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // Hasher le mot de passe avant de le stocker dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10); // Utiliser le nombre de tours de hachage souhaité

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      // Si l'utilisateur n'est pas trouvé, lancez une NotFoundException
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
