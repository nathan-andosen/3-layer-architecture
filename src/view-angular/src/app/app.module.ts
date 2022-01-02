import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { DI } from '@thenja/di';
import { UserService } from '@app-domain/services/user';
import { AjaxRequestService } from '@app-services/ajax';

// import our ui5 components
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/MessageStrip";

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
  // Angular has its own dependency injection, so for the view layer, we
  // use it
  providers: [
    {
      provide: UserService,
      useValue: DI.getService(UserService)
    },
    {
      provide: AjaxRequestService,
      useValue: DI.getService(AjaxRequestService)
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
