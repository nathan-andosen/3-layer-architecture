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

import { UserService } from '@app-domain/services/user';
import { ClientService, ManageClientsService } from '@app-domain/services/client';
import { UserModel } from '@app-domain/models/user';
import { ClientModel } from '@app-domain/models/client';
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
  get selectedClient(): ClientModel {
    return this.manageClientsSrv.selectedClient.getValue();
  }

  constructor(private userSrv: UserService,
  private clientSrv: ClientService,
  private manageClientsSrv: ManageClientsService,
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
    this.manageClientsSrv.setSelectedClient(client);
    this.clientSelected.next(this.selectedClient);
  }
  
}
