import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { User } from "../models/User";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends AbstractService<Object> {
  route = "user";

  uploadProfilePicture(image,token) {
    return this.http.post(`/${this.route}/uploadPhoto`, { image: image,token:token }, { responseType: 'json' })
  }
}
