import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/customer.entity';
import { Order } from './orders/order.entity';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'user',
      password: 'pass',
      database: 'customerdb',
      autoLoadEntities: true,

      entities: [Customer, Order],
      synchronize: true,
    }),
    CustomersModule,
    OrdersModule,
  ],
})
export class AppModule {}
