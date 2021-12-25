import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { DI } from '@thenja/di';
import { UserService } from '@app-domain/services/user';
import { AjaxRequestService } from '@app-services/ajax';
import { ClientService, ManageClientsService } from '@app-domain/services/client';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forRoot()
  ],
  providers: [
    {
      provide: UserService,
      useValue: DI.getService(UserService)
    },{
      provide: AjaxRequestService,
      useValue: DI.getService(AjaxRequestService)
    }, {
      provide: ClientService,
      useValue: DI.getService(ClientService)
    }, {
      provide: ManageClientsService,
      useValue: DI.getService(ManageClientsService)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
