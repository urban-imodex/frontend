import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./home.component').then(m => m.HomeComponent),
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'home',
    //     loadComponent: () => import('./home.component').then(m => m.HomeComponent),
    //     data: {
    //       title: 'Home'
    //     }
    //   },
      
    // ]
  }
];
