import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/products.module'; // Importez le module ProductsModule
import { OrdersModule } from './orders/orders.module'; // Importez le module OrdersModule
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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    ProductModule,
    UsersModule,
    OrdersModule, // Ajoutez le module OrdersModule ici
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
