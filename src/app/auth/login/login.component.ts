import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../shared/services/auth.service';
import { UsersService } from './../../shared/services/users.service';
import { User } from './../../shared/interfaces/user';
import { Message } from 'src/app/shared/interfaces/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  message: Message = {
    type: 'danger',
    text: ''
  };

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'loginEmail': new FormControl(null, [Validators.required, Validators.email]),
      'loginPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  showMessage(text: string, type: string = 'danger') {
    this.message.type = type;
    this.message.text = text;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  };

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.loginEmail)
      .subscribe((user: User | undefined) => {
        if (user) {
          if (user.password === formData.loginPassword) {
            this.authService.logIn();
            window.localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['system/bill']);
          } else {
            this.showMessage("The password isn't valid!");
          }
        } else {
          this.showMessage("The user doesn't exist!");
        }
      });
  };
}
