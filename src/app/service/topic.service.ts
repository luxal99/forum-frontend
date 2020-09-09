import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Topics } from '../models/Topics';

@Injectable({
  providedIn: 'root'
})
export class TopicService extends AbstractService<Topics> {

  route = "topic"

  groupByCategory(id) {
    return this.http.get(`/${this.route}/sortByCategory/` + id, { responseType: 'json' })
  }

  findByUser() {
    return this.http.post(`/${this.route}/findTopicByUser`, { token: localStorage.getItem("token")},{ responseType: 'json' });
  }
}
