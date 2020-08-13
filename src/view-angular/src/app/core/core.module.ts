import { CommonModule } from '@angular/common';
import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
  APP_INITIALIZER
} from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppInitialisationService, init_app } from './services';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [],
  providers: [
    AppInitialisationService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitialisationService],
      multi: true
    }
  ],
  exports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only '
        + 'import Core modules in the AppModule only.');
    }
  }
}
