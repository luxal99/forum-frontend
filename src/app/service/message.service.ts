import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends AbstractService<Message>{

  route = 'message';
}