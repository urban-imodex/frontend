import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor  {
  // constructor(private oidcSecurityService: OidcSecurityService) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   console.log('Intercepting request:', req.url);

  //   return from(this.oidcSecurityService.getAccessToken()).pipe(
  //     mergeMap(token => {
  //       if (token) {
  //         console.log('Token:', token);
  //         const cloned = req.clone({
  //           setHeaders: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         });
  //         return next.handle(cloned);
  //       } else {
  //         console.log('No token found');
  //         return next.handle(req);
  //       }
  //     })
  //   );
  // }
}
