
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class NavigationComponent  {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  protected readonly authenticated = this.oidcSecurityService.authenticated;

  isAuthenticated = false;
  router: any;
  redirectContent: string | undefined;



  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        if (!isAuthenticated) {
          console.log("WTFFFFF");
          this.redirectContent = `0; URL=${window.location.origin}/`;
        }
      },
      error => {
        console.error('Error checking authentication status', error);
      }
    );
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  refreshSession(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
    localStorage.clear();
    sessionStorage.clear();
  }

  authredirexp(){
    this.router.navigate(['/']);
  }

}
