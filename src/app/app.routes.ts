import { Routes } from '@angular/router';
import { AuthGuard } from '../shares/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('../features/dashboard/pages/dashboard-page.component').then(component => component.DashboardPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('../features/login/pages/login-page.component').then(component => component.LoginPage)
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  }
];
