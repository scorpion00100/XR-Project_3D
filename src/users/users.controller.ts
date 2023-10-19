import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.usersService.findByEmail(email);
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
