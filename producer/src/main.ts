import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'messages',
      protoPath: join(process.cwd(), 'src/protofiles/messages.proto'),
      url: 'localhost:50051',
    },
  });
  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://myuser:mypassword@$localhost:5672'],
      queue: 'queue-test',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
