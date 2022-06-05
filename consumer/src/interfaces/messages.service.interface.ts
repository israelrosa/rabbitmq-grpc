import { Observable } from 'rxjs';

export interface MessagesService {
  findAllMessages({}): Observable<any>;
  findOneMessage(data: { id: number }): Observable<any>;
  findMany(upstream: Observable<any>): Observable<Message>;
  createMessage(data: { text: string }): Observable<any>;
}

export interface Message {
  id: number;
  text: string;
}
