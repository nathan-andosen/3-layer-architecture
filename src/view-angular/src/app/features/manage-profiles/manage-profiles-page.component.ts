import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { UserService } from '@domain/services/user';
import { UserModel } from '@domain/models/user';

import { hasValue, isNumber } from '@app-services/utils';

@Component({
  selector: 'app-manage-profiles-page',
  templateUrl: './manage-profiles-page.component.html',
  styleUrls: ['./manage-profiles-page.component.scss']
})
export class ManageProfilesPageComponent {
  userDetailsForm: FormGroup;
  private user: UserModel;

  constructor(private userSrv: UserService,
  private router: Router,
  private formBuilder: FormBuilder) {
    this.user = this.userSrv.createUser({
      id: '123',
      username: 'Admin',
      firstname: 'Clark',
      lastname: 'Kent'
    });

    this.buildForm();
  }
  


  private buildForm() {
    this.userDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', (control: AbstractControl) => {
        const val = control.value;
        if (!hasValue(val) || isNumber(val)) return null;
        return { invalidAge: { value: val }};
      }]
    });

    // now set the form controls to the values of the user's state
    this.userDetailsForm.patchValue(this.user.state);
  }


  userDetailsOnSubmit() {
    console.log('this.user.state = ', this.user.state);
    console.log('this.userDetailsForm.value = ', this.userDetailsForm.value);
    if (this.userDetailsForm.invalid) {
      console.log('INVALID FORM: ', this.userDetailsForm);
    }
  }
  
}
