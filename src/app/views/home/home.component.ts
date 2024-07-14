import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';

// import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe, CommonModule, JsonPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    JsonPipe,
    AsyncPipe,
    DatePipe,
    CommonModule
  ]
})
export class HomeComponent implements OnInit {
  public title = 'Homes';
  response: any;


  // private readonly oidcSecurityService = inject(OidcSecurityService);
  // userToken$: Observable<string | null> | undefined;
  // lolz$: Observable<any | null> | undefined;

  // userData$ = this.oidcSecurityService.userData$;
  // isAuthenticated = false;
  // userToken$ = this.oidcSecurityService.getAccessToken();


  // configuration$ = this.oidcSecurityService.getConfiguration();

  ngOnInit() {
    // this.userToken$ = this.oidcSecurityService.getAccessToken();

    // this.oidcSecurityService.isAuthenticated$.subscribe(
    //   ({ isAuthenticated }) => {
    //     this.isAuthenticated = isAuthenticated;
    //     // this.userToken$ = this.userToken$;
    //     this.userToken$ = this.oidcSecurityService.getAccessToken();       
    //     console.warn('yyyy authenticated: ', isAuthenticated);
    //     // if(!isAuthenticated){
    //     //   this.router.navigate(['/']);
    //     // }
    //   }
    // );

    // this.oidcSecurityService.isAuthenticated$.subscribe(
    //   ({ isAuthenticated }) => {
    //     this.lolz$ = this.oidcSecurityService.getPayloadFromAccessToken().pipe(
    //       map(payload => {
    //         return {
    //           sub: payload['sub'],
    //           name: payload['name'],
    //           family_name: payload['family_name'],
    //           given_name: payload['given_name'],
    //           email: payload['email'],
    //           azp: payload['azp'],
    //           resource_access: payload['resource_access']['feclient']['roles'],
    //           email_verified: payload['email_verified'],
    //           exp: payload['exp'],
    //         };
    //       })
    //     );
    //   }
    // );

    // this.oidcSecurityService.getPayloadFromAccessToken().subscribe(
    //   {
    //   // next: (accessTokenPayload) => {
    //   next: (accessTokenPayload) => {
    //     this.lolz$ = this.oidcSecurityService.getPayloadFromAccessToken().pipe(
    //       map(payload => {
    //         return {
    //           sub: payload['sub'],
    //           name: payload['name'],
    //           family_name: payload['family_name'],
    //           given_name: payload['given_name'],
    //           email: payload['email'],
    //           azp: payload['azp'],
    //           resource_access: payload['resource_access']['feclient']['roles'],
    //           email_verified: payload['email_verified'],
    //           exp: payload['exp'],

              

    //         };
    //       })
    //     );
    //   },
    //   error: (err) => {
    //     console.error('Error fetching access token payload', err);
    //   }
    // });

  }

  constructor(private http: HttpClient) {}

  callApi() {
    this.http.get('https://e7e60ef9f5f3.sn.mynetname.net:9443/rpc/me').subscribe(
      // this.http.get('http://localhost:3000').subscribe(
      (data) => (this.response = data),
      (error) => console.error(error)
    );
  }


}
