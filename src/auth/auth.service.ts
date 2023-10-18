import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Importation de bcrypt
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) // Injectez le repository ici
    private readonly userRepository: Repository<User>, // Propriété du repository
  ) {}

  async validateUser(email: string, password: string) {
    // Recherche de l'utilisateur par email
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    // Comparaison du mot de passe fourni avec le mot de passe haché enregistré
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

  private async findUserByEmail(email: string): Promise<User | null> {
    // Recherche de l'utilisateur par email dans la base de données
    return this.userRepository.findOne({ where: { email } });
  }
}
