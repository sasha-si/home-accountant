import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import baseURL from 'src/app/shared/services/base-url';
import { Category } from './../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  createNewCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${baseURL}categories`, category)
  };
}
