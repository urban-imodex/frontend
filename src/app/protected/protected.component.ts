import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
})
export class ProtectedComponent {
// export class ProtectedComponent implements OnInit {

  constructor(private http: HttpClient) {}

  // ngOnInit() {
  //   this.http.get('http://192.168.10.10:3000/rpc/me').subscribe(
  //     response => {
  //       console.log('API Response:', response);
  //     },
  //     error => {
  //       console.error('API Error:', error);
  //     }
  //   );
  // }
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-protected',
//   templateUrl: './protected.component.html',
//   styleUrls: ['./protected.component.css'],
//   standalone: true,
// })
// export class ProtectedComponent {}
