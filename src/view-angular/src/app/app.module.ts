import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { DI } from '@thenja/di';
import { UserService } from '@app-domain/services/user';
import { AjaxRequestService } from '@app-services/ajax';
import { ClientService, ManageClientsService } from '@app-domain/services/client';

// import our ui5 components
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";

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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
