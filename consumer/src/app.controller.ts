import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

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
}
