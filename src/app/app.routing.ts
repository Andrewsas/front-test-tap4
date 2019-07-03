import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './components/layouts/admin/admin-layout.component';

import { AuthGuardService as AuthGuard } from './security/auth-guard/authguard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './view/register/register.module#RegisterModule',
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
