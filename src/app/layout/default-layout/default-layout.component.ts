import { Component, inject, NgZone, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { OidcSecurityService } from 'angular-auth-oidc-client';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;

  private readonly oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = false;
  // router: Router | undefined;

  constructor(
    // private oidcSecurityService: OidcSecurityService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }




  ngOnInit() {
    // this.userToken$ = this.oidcSecurityService.getAccessToken();

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        // this.userToken$ = this.userToken$;
        // this.userToken$ = this.oidcSecurityService.getAccessToken();       
        // console.warn('default BBBBBBBBBBBBBBB authenticated: ', isAuthenticated);
        if (!isAuthenticated) {
          console.log("FUCK OFFFF");
          this.ngZone.run(() => {
            this.router.navigate(['/home']).then(navigated => {
              if (navigated) {
                console.warn('Navigation to /home was successful');
              } else {
                console.warn('Navigation to /home failed');
              }
            });
          });
        }
      }
    );

  }


}
