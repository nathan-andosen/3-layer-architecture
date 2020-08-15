import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '@domain/services/user';

@Component({
  selector: 'app-tdee-calculator-page',
  templateUrl: './tdee-calculator-page.component.html',
  styleUrls: ['./tdee-calculator-page.component.scss']
})
export class TdeeCalculatorPageComponent {
 

  constructor(private router: Router, private userSrv: UserService) {}

  navigateToManageProfiles() {
    this.router.navigate(['clients']);
  }

  signout() {
    this.userSrv.signOut()
    .then(() => {
      this.router.navigate(['/user/signin']);
    })
    .catch((err) => {
      console.log(err);
      this.router.navigate(['/user/signin']);
    });
  }
  
}
