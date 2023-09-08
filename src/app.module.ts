import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Le type de base de données que vous utilisez (par exemple, postgres, mysql, etc.)
      host: 'localhost', // L'hôte de la base de données
      port: 5432, // Le port de la base de données
      username: 'dan001', // Le nom d'utilisateur de la base de données
      password: 'xr-project_0', // Le mot de passe de la base de données
      database: 'postgresql', // Le nom de la base de données
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Le chemin vers vos entités (modèles de données)
      synchronize: true, // Synchroniser automatiquement le schéma de la base de données (pour le développement)
      logging: true, // Activer les journaux SQL (pour le débogage)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
