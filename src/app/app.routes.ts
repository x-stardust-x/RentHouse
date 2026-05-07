import { Routes  } from '@angular/router';
import { authGuard } from './@guard/auth-guard';
import { loginGuard } from './@guard/login-guard';

export const routes: Routes = [
  {
    path: 'home',
    // redirectTo: 'home',
    loadComponent : () => import('./@component/home-component/home-component').then(c => c.HomeComponent),
    pathMatch: 'full'
  },
  {
    path:'login',
    loadComponent :() => import('./@component/login-component/login-component').then(c => c.LoginComponent),
    canActivate : [loginGuard]
  },
  {
    path:'member',
    loadComponent :() => import('./@component/member-component/member-component').then(c => c.MemberComponent),
    canActivate : [authGuard],
    data:{roles : ['young','old']},
    children:[],
  },
  {
    path:'admin',
    loadComponent :() => import('./@component/admin-component/admin-component').then(c => c.AdminComponent),
    canActivate : [authGuard],
    data:{roles : ['admin']},
    children:[],
  },
  {
    path:'register',
    loadComponent :() => import('./@component/register-component/register-component').then(c => c.RegisterComponent),
    canActivate : [loginGuard]
  },
  {
    path:'**',
    // loadComponent :() => import('./@component/login-component/login-component').then(c => c.LoginComponent),
    redirectTo: 'home'
  },
];
