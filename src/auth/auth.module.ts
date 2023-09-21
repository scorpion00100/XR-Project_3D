// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Importez le module UsersModule

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // Remplacez par votre clé secrète
      signOptions: { expiresIn: '1h' }, // Optionnel : délai d'expiration du token
    }),
    UsersModule, // Ajoutez le module UsersModule ici pour accéder aux utilisateurs
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule], // Exportez JwtModule pour l'utiliser dans d'autres modules
})
export class AuthModule {}
