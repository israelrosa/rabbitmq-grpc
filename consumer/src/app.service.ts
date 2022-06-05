import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { grpcClientOptions } from './config/grpc.options';
import {
  Message,
  MessagesService,
} from './interfaces/messages.service.interface';

@Injectable()
export class AppService implements OnModuleInit {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private messagesService: MessagesService;

  onModuleInit() {
    this.messagesService =
      this.client.getService<MessagesService>('MessagesService');
  }

  createMessage(text: string): Observable<any> {
    const data = this.messagesService.createMessage({ text });
    return data;
  }

  findAllMessages(): Observable<any> {
    const data = this.messagesService.findAllMessages({});
    return data;
  }

  findOneMessage(id: number): Observable<any> {
    const data = this.messagesService.findOneMessage({ id });
    return data;
  }

  findMany(ids: number[]): Observable<any> {
    const messages$ = new ReplaySubject<any>();

    ids.forEach((id) => {
      messages$.next({ id });
    });
    messages$.complete();

    const stream = this.messagesService.findMany(messages$.asObservable());

    stream.subscribe((message) => {
      console.log(message);
    });

    return stream.pipe(toArray());
  }
}
