import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'HOME'
    },
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./home.component').then(m => m.HomeComponent),
        data: {
          title: 'Home'
        }
      }
    ]
  }
];
