import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { ToastOptions } from './toast.interface';
import { AppToastComponent } from './app-toast.component';
import { ToasterComponent } from '@coreui/angular';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  standalone: true,
  imports: [CommonModule, AppToastComponent, ToasterComponent]
})
export class ToastContainerComponent implements OnInit {
  toasts: ToastOptions[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  removeToast(toast: ToastOptions) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastService.removeToast(toast);
  }

  getPlacementClass(placement?: string): string {
    switch (placement) {
      case 'top-center':
        return 'top-0 start-50 translate-middle-x';
      case 'top-left':
        return 'top-0 start-0';
      case 'top-right':
        return 'top-0 end-0';
      case 'bottom-center':
        return 'bottom-0 start-50 translate-middle-x';
      case 'bottom-left':
        return 'bottom-0 start-0';
      case 'bottom-right':
        return 'bottom-0 end-0';
      default:
        return 'top-0 end-0'; // default to top-right
    }
  }
}
