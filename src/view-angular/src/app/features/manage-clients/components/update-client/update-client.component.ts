import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import {
  Validators, FormBuilder, FormGroup, AbstractControl
} from '@angular/forms';

import { UserService } from '@domain/services/user';
import { ClientService } from '@domain/services/client';
import { UserModel } from '@domain/models/user';
import { ClientModel } from '@domain/models/client';
import {
  stringIsNotEmpty,
  isNumber,
  extractErrorMessage
} from '@app-services/utils';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateClientComponent {


  constructor(private userSrv: UserService,
  private clientSrv: ClientService,
  private router: Router,
  private formBuilder: FormBuilder) {
    
  }
  


  
}
