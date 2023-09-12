import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity'; // Assurez-vous d'importer correctement User ici.

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Vous devez importer User ici.
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
