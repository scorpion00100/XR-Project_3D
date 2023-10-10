import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) // Injectez le repository ici
    private readonly userRepository: Repository<User>, // Propriété du repository
  ) {}

  async validateUser(username: string, password: string) {
    // Remplacez cette logique par la validation réelle de l'utilisateur
    const user = await this.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async findUserByUsername(username: string): Promise<User | null> {
    // Remplacez cette logique par la recherche réelle de l'utilisateur dans votre base de données
    // Utilisez TypeORM pour effectuer la recherche dans la base de données.
    return this.userRepository.findOne({ where: { username } });
  }
}
