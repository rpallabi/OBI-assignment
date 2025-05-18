// apps/customer/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Start HTTP REST server (for /customers API)
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3002);
  console.log('Customer REST API is running on http://localhost:3002');

  // Start RabbitMQ listener
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:pass@localhost:5672'],
      queue: 'customer_queue',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  console.log('Customer microservice is listening to RabbitMQ');
}
bootstrap();