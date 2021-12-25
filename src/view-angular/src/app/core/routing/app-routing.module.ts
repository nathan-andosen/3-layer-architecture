import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './route-guards/auth.guard';

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
    canActivate: [AuthGuard],
    data: {
      name: 'tdee'
    }
  },
  {
    path: 'clients',
    loadChildren: () => import('../../features/manage-clients/manage-clients.module')
    .then(m => m.ManageClientsModule),
    canActivate: [AuthGuard],
    data: {
      name: 'clients'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
