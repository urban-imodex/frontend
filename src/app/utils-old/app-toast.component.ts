import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import {
  ToastComponent,
  ToasterService,
  ToasterComponent,
  ToastBodyComponent,
  ToastHeaderComponent,
  ProgressComponent, ProgressBarComponent
} from '@coreui/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
//   styleUrls: ['./toast.component.scss'],
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => AppToastComponent) }],
  standalone: true,
  imports: [ToastComponent, ToastBodyComponent, ToastHeaderComponent, ProgressComponent, ProgressBarComponent]
})
export class AppToastComponent extends ToastComponent {

  @Input() closeButton = true;
  @Input() title = '';
  @Input() message = '';
  @Input() override color = 'info';
  @Input() override autohide = true;
  @Input() override delay = 5000;
  progressValue = 0;

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }

  override ngOnInit() {
    if (this.autohide) {
      this.startProgress();
    }
  }

  startProgress() {
    const interval = 100;
    const step = interval / this.delay * 100;
    const timer = setInterval(() => {
      this.progressValue += step;
      if (this.progressValue >= 100) {
        clearInterval(timer);
      }
      this.changeDetectorRef.markForCheck();
    }, interval);
  }

  onToastHidden() {
    // Implement any additional cleanup if necessary
  }
}
