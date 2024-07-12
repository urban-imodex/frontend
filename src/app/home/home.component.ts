import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, CommonModule],
})
// export class HomeComponent  {

//   private readonly oidcSecurityService = inject(OidcSecurityService);
//   protected readonly userData = this.oidcSecurityService.userData;
//   protected readonly authenticated = this.oidcSecurityService.authenticated;
//   // protected readonly config = this.oidcSecurityService.getConfiguration();
//   configuration$ = this.oidcSecurityService.getConfiguration();
//   token$ = this.oidcSecurityService.getAccessToken();

// }


export class HomeComponent implements OnInit {
  
  

  constructor(
    private router: Router
  ) {}

  private readonly oidcSecurityService = inject(OidcSecurityService);
  userToken$: Observable<string | null> | undefined;
  lolz$: Observable<any | null> | undefined;


  userData$ = this.oidcSecurityService.userData$;
  isAuthenticated = false;
  // userToken$ = this.oidcSecurityService.getAccessToken();


  configuration$ = this.oidcSecurityService.getConfiguration();


  ngOnInit() {
    this.userToken$ = this.oidcSecurityService.getAccessToken();

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        // this.userToken$ = this.userToken$;
        this.userToken$ = this.oidcSecurityService.getAccessToken();       
        console.warn('authenticated: ', isAuthenticated);
        // if(!isAuthenticated){
        //   this.router.navigate(['/']);
        // }
      }
    );

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.lolz$ = this.oidcSecurityService.getPayloadFromAccessToken().pipe(
          map(payload => {
            return {
              sub: payload['sub'],
              name: payload['name'],
              family_name: payload['family_name'],
              given_name: payload['given_name'],
              email: payload['email'],
              azp: payload['azp'],
              resource_access: payload['resource_access']['feclient']['roles'],
              email_verified: payload['email_verified'],
              exp: payload['exp'],

              

            };
          })
        );
      }
    );

    this.oidcSecurityService.getPayloadFromAccessToken().subscribe(
      {
      // next: (accessTokenPayload) => {
      next: (accessTokenPayload) => {
        this.lolz$ = this.oidcSecurityService.getPayloadFromAccessToken().pipe(
          map(payload => {
            return {
              sub: payload['sub'],
              name: payload['name'],
              family_name: payload['family_name'],
              given_name: payload['given_name'],
              email: payload['email'],
              azp: payload['azp'],
              resource_access: payload['resource_access']['feclient']['roles'],
              email_verified: payload['email_verified'],
              exp: payload['exp'],

              

            };
          })
        );
      },
      error: (err) => {
        console.error('Error fetching access token payload', err);
      }
    });

  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
    localStorage.clear();
    sessionStorage.clear();
  }

}