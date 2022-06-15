import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, GrpcMethod, GrpcStreamCall } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly appService: AppService,
  ) {}

  @GrpcMethod('MessagesService', 'createMessage')
  async createMessage(data: { text: string }) {
    const message = this.appService.createMessage(data.text);
    await this.amqpConnection.publish('Test', 'message', message);

    return message;
  }

  @GrpcMethod('MessagesService', 'findAllMessages')
  findAllMessages() {
    const data = this.appService.getAllMessages();
    return { data };
  }

  @GrpcMethod('MessagesService', 'findOneMessage')
  findOneMessage(data: { id: number }) {
    return this.appService.getMessageById(data.id);
  }

  @GrpcStreamCall('MessagesService', 'findMany')
  findMany(requestStream: any) {
    requestStream.on('data', (data) => {
      const message = this.appService.getMessageById(data.id);
      requestStream.write(message);
    });

    requestStream.on('end', () => {
      requestStream.end();
    });
  }
}
