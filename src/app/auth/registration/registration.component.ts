import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, FormBuilder, AsyncValidator } from '@angular/forms';

import { UsersService } from './../../shared/services/users.service';
import { User } from 'src/app/shared/interfaces/user';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder
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
        console.log(user);
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
