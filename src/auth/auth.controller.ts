// auth.controller.ts

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service'; // Importez le service UserService
import { SignInDto } from './dto/signin.dto'; // Créez un DTO pour la connexion

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.createUser(createUserDto);
    const token = await this.authService.createToken(user);
    return token;
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<string> {
    const user = await this.userService.findByUsername(signInDto.username);
    if (!user || !user.comparePassword(signInDto.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.createToken(user);
    return token;
  }
}
