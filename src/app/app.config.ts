import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withHashLocation, withInMemoryScrolling, withRouterConfig, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { AutoLoginPartialRoutesGuard, LogLevel, OidcSecurityService, PublicEventsService, authInterceptor, provideAuth } from 'angular-auth-oidc-client';

// import { AuthInterceptor } from 'angular-auth-oidc-client';
import { AuthInterceptor } from './auth.interceptor';


import { DropdownModule, SidebarModule } from '@coreui/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconSetService } from '@coreui/icons-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideAuth({
      config: {
        // triggerAuthorizationResultEvent: true,
        // triggerAuthorizationResultEvent: false,
        postLoginRoute: '/',
        postLogoutRedirectUri: window.location.origin,
         forbiddenRoute: '/forbidden',
        unauthorizedRoute: '/unauthorized',
        // unauthorizedRoute: '/',
        logLevel: LogLevel.Debug,
        // historyCleanupOff: true,
        historyCleanupOff: false,
        authority: 'https://e7e60ef9f5f3.sn.mynetname.net:8443/realms/apisix',
        // redirectUrl: window.location.origin,
        redirectUrl: `${window.location.origin}/#/callback`,
        clientId: 'feclient',
        // scope: 'openid profile email offline_access',
        scope: 'openid profile email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        tokenRefreshInSeconds: 5,
        silentRenewUrl: `${window.location.origin}/silent-renew.html`,
        autoUserInfo: true,
        ignoreNonceAfterRefresh: true,
        secureRoutes: ['http://e7e60ef9f5f3.sn.mynetname.net:3000'],
        triggerRefreshWhenIdTokenExpired: true,
        // disableIdTokenValidation: true,
        maxIdTokenIatOffsetAllowedInSeconds: 20,
        renewTimeBeforeTokenExpiresInSeconds: 1,
      },
    }),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    OidcSecurityService,
    AutoLoginPartialRoutesGuard,
    PublicEventsService,
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations(),
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
  ],
};
