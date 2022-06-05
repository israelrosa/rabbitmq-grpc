import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class AppService {
  private messages: Message[] = [];

  createMessage(text: string): Message {
    const message = {
      id: this.messages.length + 1,
      text,
    };
    this.messages.push(message);
    return message;
  }

  getAllMessages(): Message[] {
    return this.messages;
  }

  getMessageById(id: number): Message {
    return this.messages.find((message) => message.id === id);
  }
}
