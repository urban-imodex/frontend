import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Title } from '@angular/platform-browser';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<router-outlet />',
  // styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
      RouterOutlet,
  ]
})

export class AppComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  title = 'imoDEX';
  isAuthenticated = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
  ) {
    console.log('appComponent loaded');
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };

    // this.oidcSecurityService
    // .checkAuth()
    // .subscribe(({ isAuthenticated, userData, accessToken, idToken, configId  }) => {
    //   this.isAuthenticated = isAuthenticated;
    //   console.log('app authenticated', isAuthenticated);
    //   console.log(`Current access token is '${accessToken}'`);
    // });

  }

  ngOnInit(): void {
    this.router.events.subscribe((evt: any) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken, idToken, configId  }) => {
        this.isAuthenticated = isAuthenticated;
        console.log('zzzzzz app authenticated?', isAuthenticated);
        console.log(`zzzzzz Current access token is '${accessToken}'`);
      });
      
  }
  

}
