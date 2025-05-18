import { Controller, Get } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';

@Controller()
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {}

  @Get()
  getHello(): string {
    return this.productOrderService.getHello();
  }
}
