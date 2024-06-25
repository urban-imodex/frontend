import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AutoLoginPartialRoutesGuard, LogLevel, OidcSecurityService, PublicEventsService, authInterceptor, provideAuth } from 'angular-auth-oidc-client';

// import { AuthInterceptor } from 'angular-auth-oidc-client';
import { AuthInterceptor } from './auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideAuth({
      config: {
        triggerAuthorizationResultEvent: true,
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
        redirectUrl: `${window.location.origin}/callback`,
        clientId: 'feclient',
        scope: 'openid profile email offline_access',
        // scope: 'openid profile email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        // tokenRefreshInSeconds: 2,
        silentRenewUrl: `${window.location.origin}/silent-renew.html`,
        autoUserInfo: true,
        ignoreNonceAfterRefresh: true,
        secureRoutes: ['http://e7e60ef9f5f3.sn.mynetname.net:3000'],
        // triggerRefreshWhenIdTokenExpired: false,
        // disableIdTokenValidation: true,
        maxIdTokenIatOffsetAllowedInSeconds: 20,
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
  ],
};
