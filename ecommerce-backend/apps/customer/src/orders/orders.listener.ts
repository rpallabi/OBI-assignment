import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersListener {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('order.created')
  async handleOrderCreated(@Payload() data: any) {
    console.log('Received order.created:', data);
    await this.ordersService.saveOrder(data);
  }
}