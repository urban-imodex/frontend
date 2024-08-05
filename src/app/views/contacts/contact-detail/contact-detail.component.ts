import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../models/contact.model';
import { ContactsApiService } from '../contactsAPI';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsApiService
  ) {}

  ngOnInit() {
    const contactid = this.route.snapshot.paramMap.get('contactid');
    if (contactid) {
      this.contactsService.getContact(contactid).subscribe({
        next: (contact) => this.contact = contact,
        error: (err) => console.error('Error loading contact details:', err)
      });
    }
  }

  
}

