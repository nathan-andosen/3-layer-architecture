import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Validators, FormBuilder, FormGroup, AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '@domain/services/user';
import { ClientService, ManageClientsService } from '@domain/services/client';
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
export class UpdateClientComponent implements OnDestroy {
  private selectedClientSubscription: Subscription;
  // selectedClient: ClientModel;
  get selectedClient(): ClientModel {
    return this.manageClientsSrv.selectedClient.getValue();
  }

  constructor(private userSrv: UserService,
  private clientSrv: ClientService,
  private manageClientsSrv: ManageClientsService,
  private changeRef: ChangeDetectorRef,
  private router: Router,
  private formBuilder: FormBuilder) {
    
    this.selectedClientSubscription = this.manageClientsSrv.selectedClient
    .subscribe((client) => {
      console.log('Client was selected: ', client);
      // this.selectedClient = client;
      // if (!client) return;
      this.changeRef.markForCheck();
    });
  }
  

  ngOnDestroy() {
    // could use until-destroy to auto unsubscribe
    // https://github.com/ngneat/until-destroy
    if (this.selectedClientSubscription) {
      this.selectedClientSubscription.unsubscribe();
    }
  }
  
}
