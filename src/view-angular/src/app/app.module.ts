import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { DI } from '@thenja/DI';
import { UserService } from '@domain/services/user';
import { AjaxRequestService } from '@app-services/ajax';
import { ClientService } from '@domain/services/client';
import { DummyLocalStorageService } from '@app-services/ajax/dummy-local-storage.service';


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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
