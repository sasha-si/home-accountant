import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from './../interfaces/user';
import baseURL from './base-url';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.http.get<User | any>(`${baseURL}users?email=${email}`)//?any
    .pipe(map((user: User[]) => user[0] ? user[0] : undefined));
  };

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${baseURL}users`, user)
  };
};
