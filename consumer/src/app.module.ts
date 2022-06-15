import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://myuser:mypassword@localhost:5672',
      enableControllerDiscovery: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
