import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
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
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent {
  @Output() clientSelected: EventEmitter<ClientModel>;

  errorMsg: string;
  clients: ClientModel[];
  selectedClient: ClientModel;

  constructor(private userSrv: UserService,
  private clientSrv: ClientService,
  private router: Router,
  private formBuilder: FormBuilder) {
    this.clientSelected = new EventEmitter();
    this.fetchClients();
  }
  

  private async fetchClients() {
    try {
      this.clients = await this.clientSrv.fetchAllClients();
    } catch(err) {
      this.errorMsg = extractErrorMessage(err);
    }
  }


  selectClient(client: ClientModel) {
    this.selectedClient = client;
    this.clientSelected.next(this.selectedClient);
  }
  
}
