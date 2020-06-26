import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'user', pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('../../features/sign-in/sign-in.module')
    .then(m => m.SignInModule),
    data: {
      name: 'sign-in'
    }
  },
  {
    path: 'tdee',
    loadChildren: () => import('../../features/tdee-calculator/tdee-calculator.module')
    .then(m => m.TdeeCalculatorModule),
    data: {
      name: 'tdee-calculator'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
