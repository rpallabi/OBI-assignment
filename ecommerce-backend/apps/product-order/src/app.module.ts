import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'productdb',
      entities: [Product, Order, OrderItem],
      synchronize: true,
    }),
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'customer_queue',
        },
      },
    ]),
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
