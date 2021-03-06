import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Category } from "../models/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AbstractService<Category> {

  route = "category"

}
