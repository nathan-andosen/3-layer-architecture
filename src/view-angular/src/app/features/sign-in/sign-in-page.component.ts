import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '@domain/services/user';
import { UserModel } from '@domain/models/user';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  user: UserModel;

  constructor(private userSrv: UserService, private router: Router) {
    
  }




  navigateToTdeeCalculator() {
    this.router.navigate(['tdee']);
  }


  createUser() {
    this.user = this.userSrv.createUser({ id: '123', username: 'clark-kent' });
  }
}
