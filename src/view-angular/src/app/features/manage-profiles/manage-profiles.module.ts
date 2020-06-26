import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ManageProfilesPageComponent } from './manage-profiles-page.component';


@NgModule({
  declarations: [
    ManageProfilesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageProfilesPageComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageProfilesModule {}
