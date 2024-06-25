import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProtectedComponent } from './protected/protected.component';
import { ExternalApiComponent } from './external-api/external-api.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { CallbackComponent } from './callback/callback.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    // { path: '', component: HomeComponent, canActivate: [AutoLoginPartialRoutesGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AutoLoginPartialRoutesGuard] },
    { path: 'callback', component: CallbackComponent },
    { path: 'protected', component: ProtectedComponent, canActivate: [AutoLoginPartialRoutesGuard] },
    { path: 'external-api', component: ExternalApiComponent, canActivate: [AutoLoginPartialRoutesGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }, 

];

