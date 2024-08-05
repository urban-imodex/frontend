import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'CONTACTS'
    },
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./contacts.component').then(m => m.ContactsComponent),
        data: {
          title: 'Contacts'
        }
      },
      {
        path: ':contactid',
        loadComponent: () => import('./contact-detail/contact-detail.component').then(m => m.ContactDetailComponent),
        data: {
          title: 'Contact Detail'
        }
      }
    ]
  }
];
