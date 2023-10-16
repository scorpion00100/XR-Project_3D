import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importez TypeOrmModule
import { User } from '../users/user.entity'; // Importez l'entité User
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]), // Importez le UserRepository dans l'AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
