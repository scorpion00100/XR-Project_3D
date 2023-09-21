import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Importez JwtAuthGuard

@Controller('api/users')
@UseGuards(JwtAuthGuard) // Appliquez JwtAuthGuard à l'ensemble du contrôleur
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.findUserById(id);
  }

  // Les routes du contrôleur sont maintenant protégées par défaut
}
