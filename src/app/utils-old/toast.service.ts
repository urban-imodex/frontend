import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from './toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toastState = new BehaviorSubject<Toast[]>([]);
  toastState = this._toastState.asObservable();

  addToast(toast: Toast) {
    this._toastState.next([...this._toastState.value, toast]);
  }

  removeToast(toast: Toast) {
    this._toastState.next(this._toastState.value.filter(t => t !== toast));
  }
}
