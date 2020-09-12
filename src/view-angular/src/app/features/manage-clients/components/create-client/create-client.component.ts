import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import {
  Validators, FormBuilder, FormGroup, AbstractControl
} from '@angular/forms';

import { UserService } from '@domain/services/user';
import { ClientService } from '@domain/services/client';
import { UserModel } from '@domain/models/user';
import {
  stringIsNotEmpty,
  isNumber,
  extractErrorMessage
} from '@app-services/utils';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateClientComponent {
  createNewClientForm: FormGroup;
  private user: UserModel;
  formErrorMsg: string;
  formSuccessMsg: string;

  constructor(private userSrv: UserService,
  private clientSrv: ClientService,
  private router: Router,
  private formBuilder: FormBuilder) {
    this.user = this.userSrv.createUser({
      id: new Date().getTime().toString(),
      username: '',
      firstname: '',
      lastname: ''
    });

    this.buildForm();
  }
  


  private buildForm() {
    this.createNewClientForm = this.formBuilder.group({
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
    this.createNewClientForm.patchValue(this.user.state);
  }


  createClientOnSubmit() {
    this.formErrorMsg = '';
    this.formSuccessMsg = '';
    console.log('this.user.state = ', this.user.state);
    console.log('this.userDetailsForm.value = ', this.createNewClientForm.value);
    if (this.createNewClientForm.invalid) {
      console.log('INVALID FORM: ', this.createNewClientForm);
      this.formErrorMsg = 'Invalid form';
      return;
    }

    // TODO: user this.clientSrv to create the client, should get created in
    // the local storage
    const clientData = this.createNewClientForm.value;
    this.clientSrv.createClient(clientData)
    .then((client) => {
      this.formSuccessMsg = 'Client created successfully. Id = '
      + client.state.id;
    })
    .catch((err) => {
      this.formErrorMsg = extractErrorMessage(err);
    });
  }
  
}
