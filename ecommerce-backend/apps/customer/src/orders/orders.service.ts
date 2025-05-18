import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private customerService: CustomersService,
  ) {}

  async saveOrder(orderData: any) {
    let customer = await this.customerService.findOne(orderData.customerId);

    if (!customer) {
      customer = await this.customerService.create({
        id: orderData.customerId,
        name: `Customer ${orderData.customerId}`,
        email: `customer${orderData.customerId}@example.com`,
      });
    }

    const order = this.repo.create({
      externalOrderId: orderData.orderId,
      items: orderData.items,
      customer,
    });
    return this.repo.save(order);
  }
}
