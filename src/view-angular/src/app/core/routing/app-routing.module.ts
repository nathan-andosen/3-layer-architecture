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
    path: 'home',
    loadChildren: () => import('../../features/home/home-page.module')
    .then(m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: {
      name: 'home'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
