import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, JsonPipe } from '@angular/common';
// import { AuthInterceptor } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-external-api',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  template: `
    <h1>External API</h1>
    <button (click)="callApi()">Call API</button>
    <pre>{{ response | json }}</pre>
  `,
})
export class ExternalApiComponent {
  response: any;

  constructor(private http: HttpClient) {}

  callApi() {
    this.http.get('http://e7e60ef9f5f3.sn.mynetname.net:3000/rpc/me').subscribe(
      // this.http.get('http://localhost:3000').subscribe(
      (data) => (this.response = data),
      (error) => console.error(error)
    );
  }
}
