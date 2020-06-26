import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { TdeeCalculatorPageComponent } from './tdee-calculator-page.component';


@NgModule({
  declarations: [
    TdeeCalculatorPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TdeeCalculatorPageComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TdeeCalculatorModule {}
