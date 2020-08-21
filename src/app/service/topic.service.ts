import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Topics } from '../models/Topics';

@Injectable({
  providedIn: 'root'
})
export class TopicService extends AbstractService<Topics> {

  route = "topic"
}
