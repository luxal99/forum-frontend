import { Injectable } from '@angular/core';
import { AbstractService } from "./abstract.service";
import { Reply } from "../models/Reply";
@Injectable({
  providedIn: 'root'
})
export class ReplyService extends AbstractService<Reply>{

  route='reply';

  incrementLike(id){
    return this.http.put(`/${this.route}/like/` + id, { responseType: 'text' })
  }

  findByUser() {
    return this.http.post(`/${this.route}/findRepliesByUser`, { token: localStorage.getItem("token")},{ responseType: 'json' });
  }
}
