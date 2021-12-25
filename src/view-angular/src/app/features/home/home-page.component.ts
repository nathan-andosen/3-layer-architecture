import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '@app-domain/services/user';

/**
 * Home page component
 *
 * @export
 * @class HomePageComponent
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  

  constructor(private router: Router, private userSrv: UserService) {}



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
