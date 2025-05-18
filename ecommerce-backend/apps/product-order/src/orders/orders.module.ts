import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:pass@localhost:5672'], // match docker RabbitMQ config
          queue: 'customer_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}