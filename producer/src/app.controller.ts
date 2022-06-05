import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamCall } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Message } from './interfaces/message.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('MessagesService', 'createMessage')
  createMessage(data: { text: string }) {
    return this.appService.createMessage(data.text);
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
