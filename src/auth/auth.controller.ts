import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<string> {
    try {
      const user = await this.userService.createUser(createUserDto);
      const token = await this.authService.createToken(user);
      return token;
    } catch (error) {
      throw new HttpException(
        "Erreur lors de l'inscription",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<string> {
    const user = await this.authService.validateUser(
      signInDto.email, // Utilisation de l'e-mail
      signInDto.password,
    );

    if (!user) {
      throw new HttpException(
        'Identifiants invalides',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.createToken(user);
    return token;
  }
}
