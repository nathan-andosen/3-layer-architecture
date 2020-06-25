import { CommonModule } from '@angular/common';
import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [],
  providers: [],
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
