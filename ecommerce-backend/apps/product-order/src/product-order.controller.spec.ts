import { Test, TestingModule } from '@nestjs/testing';
import { ProductOrderController } from './product-order.controller';
import { ProductOrderService } from './product-order.service';

describe('ProductOrderController', () => {
  let productOrderController: ProductOrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductOrderController],
      providers: [ProductOrderService],
    }).compile();

    productOrderController = app.get<ProductOrderController>(
      ProductOrderController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productOrderController.getHello()).toBe('Hello World!');
    });
  });
});
