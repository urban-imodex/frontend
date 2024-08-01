import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent, ToastHeaderComponent, ToastBodyComponent, ButtonCloseDirective, ToasterComponent } from '@coreui/angular-pro';

@Component({
  selector: 'app-toast',
  templateUrl: './app-toast.component.html',
  styleUrls: ['./app-toast.component.scss'],
  standalone: true,
  imports: [CommonModule, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ToasterComponent, ButtonCloseDirective]
})
export class AppToastComponent implements OnInit {
  @Input() title = '';
  @Input() message = '';
  @Input() color = 'info';
  @Input() autohide = true;
  @Input() delay = 5000;
  visible = true;
//   placement = 'top-center';
  
  private hideTimeout: any;

  ngOnInit() {
    if (this.autohide) {
      this.startAutoHide();
    }
  }

  startAutoHide() {
    this.hideTimeout = setTimeout(() => this.hideToast(), this.delay);
  }

  hideToast() {
    this.visible = false;
    clearTimeout(this.hideTimeout);
  }
}
