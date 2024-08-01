import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastOptions } from './toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastOptions[]>([]);
  toasts$ = this.toastSubject.asObservable();
  private toasts: ToastOptions[] = [];

  showToast(toast: ToastOptions) {
    this.toasts = [...this.toasts, toast];
    this.toastSubject.next(this.toasts);

    if (toast.autohide) {
      setTimeout(() => this.removeToast(toast), toast.delay);
    }
  }

  removeToast(toast: ToastOptions) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastSubject.next(this.toasts);
  }

  showSuccessToast(message: string, title: string = 'Success', delay: number = 5000) {
    this.showToast({
      title,
      message,
      color: 'success',
      autohide: true,
      delay,
      placement: 'top-right'
    });
  }

  showFailureToast(message: string, title: string = 'Error', delay: number = 5000) {
    this.showToast({
      title,
      message,
      color: 'danger',
      autohide: true,
      delay,
      placement: 'top-center'
    });
  }
}
