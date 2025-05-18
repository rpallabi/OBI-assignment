import { Module } from '@nestjs/common';
import { ProductOrderController } from './product-order.controller';
import { ProductOrderService } from './product-order.service';

@Module({
  imports: [],
  controllers: [ProductOrderController],
  providers: [ProductOrderService],
})
export class ProductOrderModule {}
