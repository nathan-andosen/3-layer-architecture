import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { UserService } from '@app-domain/services/user';
import { UserModel } from '@app-domain/models/user';
import { stringIsNotEmpty, isNumber } from '@app-services/utils';
import { ClientModel } from '@app-domain/models/client';

@Component({
  selector: 'app-manage-clients-page',
  templateUrl: './manage-clients-page.component.html',
  styleUrls: ['./manage-clients-page.component.scss']
})
export class ManageClientsPageComponent {
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
        if (!stringIsNotEmpty(val) || isNumber(val)) return null;
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




  createClientOnSubmit() {

  }


  clientSelected(client: ClientModel) {
    console.log('Client selected: ', client);
  }
  
}
