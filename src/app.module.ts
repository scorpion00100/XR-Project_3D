import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module'; // Assurez-vous que le chemin est correct
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dan001',
      password: 'xr-project_0',
      database: 'postgresql',
      entities: ['src/**/*.entity.js'], // Chemin vers vos entités
      synchronize: true,
      logging: true,
      migrations: ['src/migrations/*.js'], // Chemin vers vos migrations
    }),
    ProductModule,
    UsersModule,
    OrdersModule, // Assurez-vous d'importer OrdersModule ici
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
