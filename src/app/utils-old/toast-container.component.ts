import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToastComponent } from './app-toast.component';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast-container',
    templateUrl: './toast-container.component.html',
    //   styleUrls: ['./toast-container.component.scss'],
    standalone: true,
    imports: [AppToastComponent, CommonModule], // Include AppToastComponent here if standalone
})
export class ToastContainerComponent {
    toasts: any[] = [];

    constructor(private toastService: ToastService) { }

    ngOnInit() {
        this.toastService.toastState.subscribe((toasts: any[]) => {
            this.toasts = toasts;
        });
    }

    removeToast(toast: any) {
        this.toastService.removeToast(toast);
    }
}
