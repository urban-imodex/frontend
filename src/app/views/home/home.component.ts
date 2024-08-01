import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';

// import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe, CommonModule, JsonPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular-pro';

import { ToastService } from '../../utils/toast.service';
import { ToastOptions } from '../../utils/toast.interface';

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

  // placement = ToasterPlacement.TopCenter;

  // @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  ngOnInit() {

  }

  constructor(private http: HttpClient, private toastService: ToastService) {}

  callApi() {
    this.http.get('https://e7e60ef9f5f3.sn.mynetname.net:9443/rpc/me').subscribe(
      // this.http.get('http://localhost:3000').subscribe(
      (data) => (this.response = data),
      (error) => console.error(error)
    );
  }

  showNotification() {
    const toast: ToastOptions = {
      title: 'Notification',
      message: 'This is a toast notification.',
      color: 'success',
      autohide: true,
      delay: 2500
    };
    this.toastService.showToast(toast);
  }

  showNotification2() {
    const toast: ToastOptions = {
      title: 'Notification',
      message: 'alupigus!!!!',
      color: 'danger',
      autohide: true,
      delay: 2500
    };
    this.toastService.showToast(toast);
  }

  showSuccess() {
    this.toastService.showSuccessToast('Operation completed successfully.');
  }

  showFailure() {
    this.toastService.showFailureToast('An error occurred. Please try again.');
  }



}
