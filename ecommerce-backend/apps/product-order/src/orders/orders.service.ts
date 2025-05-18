import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { ClientProxy, Client } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @Inject('CUSTOMER_SERVICE') private client: ClientProxy,
  ) {}

  async createOrder(data: any) {
    const items = data.items.map((i) => this.itemRepo.create(i));
    const order = this.orderRepo.create({ customerId: data.customerId, items });
    await this.orderRepo.save(order);

    this.client.emit('order.created', {
      orderId: order.id,
      customerId: order.customerId,
      items: order.items,
    });
    return order;
  }

  async getAllOrders() {
    return this.orderRepo.find({ relations: ['items'] });
  }
}
