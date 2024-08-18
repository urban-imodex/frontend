import { Component } from '@angular/core';
import { CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';

@Component({
  selector: 'app-contact-tags',
  standalone: true,
  imports: [CardComponent, ],
  templateUrl: './contact-tags.component.html',
  styleUrl: './contact-tags.component.scss'
})
export class ContactTagsComponent {

}
