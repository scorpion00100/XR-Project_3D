// auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user: User): Promise<string> {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
