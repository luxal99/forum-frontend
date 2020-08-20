import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbstractService<T> {

  protected route: string;

  constructor(private http: HttpClient) { }

  save(entity: T) {
    return this.http.post(`/${this.route}`, entity, { responseType: 'text' });
  }

  findById(id) {
    return this.http.get(`/${this.route}/` + id, { responseType: 'json' })
  }

  getAll() {
    return this.http.get(`/${this.route}`, { responseType: 'json' });
  }
}
