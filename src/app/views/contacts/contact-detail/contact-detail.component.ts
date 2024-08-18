import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { NavModule } from '@coreui/angular';

import { ContactsApiService } from '../contactsAPI';
import { routes } from '../routes';
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  standalone: true,
  imports: [RouterModule,NavModule]
})
export class ContactDetailComponent implements OnInit {
  contact: any;

  constructor(private route: ActivatedRoute, private contactService: ContactsApiService) {}

  ngOnInit() {
    const contactId: string | null = this.route.snapshot.paramMap.get('contactid');
    if (contactId) {
      this.contactService.getContact(contactId).subscribe(contact => this.contact = contact);
    } else {
      // Handle the case where contactId is null (e.g., navigate away or show an error)
      console.error('Contact ID is null');
    }
  }
}
