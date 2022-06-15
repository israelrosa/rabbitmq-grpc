import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './interfaces/messages.service.interface';

@Controller('messages')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createMessage(@Body() { text }) {
    return this.appService.createMessage(text);
  }

  @Get()
  findAllMessages() {
    return this.appService.findAllMessages();
  }

  @Get(':id')
  findOneMessage(@Param('id') id: number) {
    return this.appService.findOneMessage(id);
  }

  @Post('stream')
  findMany(@Body() { ids }) {
    return this.appService.findMany(ids);
  }

  @RabbitSubscribe({
    exchange: 'Test',
    routingKey: 'message',
    queue: 'messages',
  })
  getMessages(msg: Message) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}
