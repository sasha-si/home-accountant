import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from './../../../../shared/interfaces/user';
import { AuthService } from './../../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isShown = false;
  user!: User;

  date: Date = new Date();

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('user')!);
  }

  onDropdownOpened() {
    this.isShown = !this.isShown;
  };

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  };
}
