import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { DI } from '@thenja/DI';
// import { UserService } from '@domain/services/user/user.service';

import { UserService } from '../domain/services/user/user.service';

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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
