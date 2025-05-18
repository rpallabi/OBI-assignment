import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { OrdersListener } from './orders.listener';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CustomersModule],
  providers: [OrdersService, OrdersListener],
})
export class OrdersModule {}
