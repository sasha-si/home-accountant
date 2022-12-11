import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { UsersService } from './../../shared/services/users.service';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'registrationEmail': [null,
        [Validators.required, Validators.email], [this.forbiddenEmails()]],
      'registrationPassword': [null, [Validators.required, Validators.minLength(6)]],
      'registrationName': [null, [Validators.required]],
      'registrationAgree': [false, [Validators.requiredTrue]]
    });

    this.form.valueChanges.subscribe((formValue => {
      console.log('form', this.form);
    }))
  }

  onSubmit() {
    const { registrationEmail, registrationPassword, registrationName } = this.form.value;
    const user = {
      email: registrationEmail,
      password: registrationPassword,
      name: registrationName
    };

    this.usersService.createNewUser(user)
      .subscribe((user) => {
        this.authService.logIn();
        window.localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['system/bill']);
      });
  };

  forbiddenEmails(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usersService.getUserByEmail(control.value).pipe(
        map((result: User | undefined) => !result ? null : { forbiddenEmail: true })
      );
    };
  }
}
