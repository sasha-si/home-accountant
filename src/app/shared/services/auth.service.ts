import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticated = false;

  logIn () {
    this.isAuthenticated = true;
  };

  logOut () {
    this.isAuthenticated = false;
    window.localStorage.clear();
  };

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  };
}
