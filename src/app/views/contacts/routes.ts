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
        },
        children: [
          {
            path: '',
            loadComponent: () => import('./contact-detail-form/contact-detail-form.component').then(m => m.ContactDetailFormComponent),
            data: {
              title: 'Contact Detail Form'
            }
          },
          {
            path: 'tags',
            loadComponent: () => import('./contact-tags/contact-tags.component').then(m => m.ContactTagsComponent),
            data: {
              title: 'Contact Tags'
            }
          },
          {
            path: 'history',
            loadComponent: () => import('./contact-history/contact-history.component').then(m => m.ContactHistoryComponent),
            data: {
              title: 'Contact History'
            }
          }
        ]
      }
    ]
  }
];
