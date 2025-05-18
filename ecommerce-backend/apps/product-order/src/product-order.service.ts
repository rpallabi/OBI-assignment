import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductOrderService {
  getHello(): string {
    return 'Hello World!';
  }
}
