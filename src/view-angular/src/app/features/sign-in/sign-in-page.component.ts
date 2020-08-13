import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '@domain/services/user';
import { UserModel } from '@domain/models/user';
import { isString } from '@app-services/utils';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  user: UserModel;
  signinForm: FormGroup;
  signinErrorMsg: string = '';

  constructor(private userSrv: UserService,
  private router: Router,
  private formBuilder: FormBuilder) {
    if (this.userSrv.userIsSignedIn()) {
      this.router.navigate(['tdee']);
      return;
    }
    this.buildSigninForm();
  }


  private buildSigninForm() {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  navigateToTdeeCalculator() {
    this.router.navigate(['tdee']);
  }


  createUser() {
    this.user = this.userSrv.createUser({ id: '123', username: 'clark-kent' });
  }


  signinOnSubmit() {
    this.signinErrorMsg = '';
    if (this.signinForm.invalid) {
      this.signinErrorMsg = 'Please enter a valid username and password';
      return;
    }
    const username = this.signinForm.controls.username.value;
    const password = this.signinForm.controls.password.value;
    this.userSrv.signIn(username, password)
    .then((user) => {
      this.router.navigate(['tdee']);
    })
    .catch((err) => {
      if (isString(err)) {
        this.signinErrorMsg = err;
      } else if (err && err.message) {
        this.signinErrorMsg = err.message;
      } else {
        this.signinErrorMsg = 'Signin Error: Unexpected error.';
      }
    });
  }
}
