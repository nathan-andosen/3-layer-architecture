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
      name: 'tdee'
    }
  },
  {
    path: 'profiles',
    loadChildren: () => import('../../features/manage-profiles/manage-profiles.module')
    .then(m => m.ManageProfilesModule),
    data: {
      name: 'profiles'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
