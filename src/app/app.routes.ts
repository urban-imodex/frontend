import { Routes } from '@angular/router';
// import { ProtectedComponent } from './protected/protected.component';
import { ExternalApiComponent } from './external-api/external-api.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { CallbackComponent } from './callback/callback.component';

import { DefaultLayoutComponent } from './layout';



export const routes: Routes = [
    {path: '', redirectTo: 'home',  pathMatch: 'full'  },
    {
        path: '',
        component: DefaultLayoutComponent,
        canActivate: [AutoLoginPartialRoutesGuard],
        data: {
          title: 'Home'
        },
        children: [
          {
            path: '',
            loadChildren: () => import('./views/home/routes').then((m) => m.routes),
            canActivate: [AutoLoginPartialRoutesGuard],
          },
          {
            path: 'icons',
            loadChildren: () => import('./views/icons/routes').then((m) => m.routes),
            canActivate: [AutoLoginPartialRoutesGuard],
          },
          {
            path: 'contacts',
            loadChildren: () => import('./views/contacts/routes').then((m) => m.routes),
            canActivate: [AutoLoginPartialRoutesGuard],
          },
          {
            path: 'pages',
            loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
          }
        ]
      },
    // { path: '', component: HomeComponent, canActivate: [AutoLoginPartialRoutesGuard] },
    // { path: 'home', component: HomeComponent, canActivate: [AutoLoginPartialRoutesGuard] },
    { path: 'callback', component: CallbackComponent },
    // { path: 'protected', component: ProtectedComponent, canActivate: [AutoLoginPartialRoutesGuard] },
    { path: 'external-api', component: ExternalApiComponent, canActivate: [AutoLoginPartialRoutesGuard] },
    {
      path: '404',
      loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
      data: {
        title: 'Page 404'
      }
    },
    {
      path: '500',
      loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
      data: {
        title: 'Page 500'
      }
    },
    {
      path: 'login',
      loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
      data: {
        title: 'Login Page'
      }
    },
    {
      path: 'register',
      loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
      data: {
        title: 'Register Page'
      }
    },
    { path: '**', redirectTo: '' }

];


// export const routes: Routes = [
//     { path: '', pathMatch: 'full', redirectTo: 'home' },
//     // { path: '', component: HomeComponent, canActivate: [AutoLoginPartialRoutesGuard] },
//     { path: 'home', component: HomeComponent, canActivate: [AutoLoginPartialRoutesGuard] },
//     { path: 'callback', component: CallbackComponent },
//     // { path: 'protected', component: ProtectedComponent, canActivate: [AutoLoginPartialRoutesGuard] },
//     { path: 'external-api', component: ExternalApiComponent, canActivate: [AutoLoginPartialRoutesGuard] },
//     // { path: '**', pathMatch: 'full', redirectTo: 'home' }, 

// ];

