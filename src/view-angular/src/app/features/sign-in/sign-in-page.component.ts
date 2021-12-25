import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '@app-domain/services/user';
import { extractErrorMessage } from '@app-services/utils';


/**
 * Sign in page component
 *
 * @export
 * @class SignInPageComponent
 */
@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  signinForm: FormGroup;
  signinErrorMsg: string = '';


  /**
   * Creates an instance of SignInPageComponent.
   * 
   * @param {UserService} userSrv
   * @param {Router} router
   * @param {FormBuilder} formBuilder
   * @memberof SignInPageComponent
   */
  constructor(private userSrv: UserService,
  private router: Router,
  private formBuilder: FormBuilder) {
    if (this.userSrv.userIsSignedIn()) {
      this.router.navigate(['home']);
      return;
    }
    this.buildSigninForm();
  }


  /**
   * Build sign in form
   *
   * @private
   * @memberof SignInPageComponent
   */
  private buildSigninForm() {
    this.signinForm = this.formBuilder.group({
      username: ['admin', Validators.required],
      password: ['admin', Validators.required]
    });
  }


  /**
   * On submit handler for sign in form
   *
   * @returns
   * @memberof SignInPageComponent
   */
  async signinOnSubmit() {
    this.signinErrorMsg = '';
    if (this.signinForm.invalid) {
      this.signinErrorMsg = 'Please enter a valid username and password';
      return;
    }
    const username = this.signinForm.controls.username.value;
    const password = this.signinForm.controls.password.value;
    try {
      await this.userSrv.signIn(username, password);
      this.router.navigate(['home']);
    } catch(err) {
      this.signinErrorMsg = extractErrorMessage(err);
    }
  }
}
