import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:pass@localhost:5672'],
      queue: 'product_order_queue',
      queueOptions: { durable: true },
    },
  });
  app.enableCors({
    origin: 'http://localhost:3000', // allow frontend
    credentials: true,
  });
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log('Product-Order service listening on port 3001');
}
bootstrap();
