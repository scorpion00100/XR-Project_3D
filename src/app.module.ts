import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AvisModule } from './avis/avis.module';
import { AuthModule } from './auth/auth.module';
import { TableModule } from './table/table.module';
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
      database: 'savor',
      entities: ['src/**/*.entity.js'], // Chemin vers vos entités
      synchronize: true,
      logging: true,
      migrations: ['src/migrations/*.js'], // Chemin vers vos migrations
    }),
    ProductModule,
    UsersModule,
    OrdersModule,
    AvisModule,
    AuthModule,
    TableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
