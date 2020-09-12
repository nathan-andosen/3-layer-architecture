import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { ManageClientsPageComponent } from './manage-clients-page.component';
import {
  CreateClientComponent
} from './components/create-client/create-client.component';
import {
  ClientListComponent
} from './components/client-list/client-list.component';
import {
  UpdateClientComponent
} from './components/update-client/update-client.component';

@NgModule({
  declarations: [
    ManageClientsPageComponent,
    CreateClientComponent,
    ClientListComponent,
    UpdateClientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageClientsPageComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageClientsModule {}
