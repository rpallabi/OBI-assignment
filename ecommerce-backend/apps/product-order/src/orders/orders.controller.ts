import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Body() body) {
    return this.service.createOrder(body);
  }

  @Get()
  getAll() {
    return this.service.getAllOrders();
  }
}
