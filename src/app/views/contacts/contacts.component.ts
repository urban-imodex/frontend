import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactEditModalComponent } from './contact-edit-modal/contact-edit-modal.component';
import { ContactsApiService } from './contactsAPI';
import { Contact } from '../../models/contact.model';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  CardTextDirective,
  CardTitleDirective,
  TabDirective,
  TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TextColorDirective
} from '@coreui/angular'

import { IItem,SmartTableComponent,TableColorDirective,TemplateIdDirective, ToasterComponent, ToasterPlacement } from '@coreui/angular-pro';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactEditModalComponent,
    ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent,
    SmartTableComponent, TableColorDirective, TemplateIdDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    CardTextDirective,
    CardTitleDirective,
    TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent,
    TextColorDirective
   ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  data: Contact[] = [];
  columns: any[] = [
    // { key: 'contactid', label: 'contact id' },
    { key: 'firstname', label: 'First Name' },
    { key: 'lastname', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'addr', label: 'Address' },
    { key: 'createdat', label: 'Created At' }
    // Define other columns as necessary
  ];

  selectedContact: Contact | null = null;

  constructor(private contactsService: ContactsApiService) {}

  ngOnInit() {
    this.fetchData();
    // this.showToast();
    
  }
  
  fetchData() {
    this.contactsService.getData().subscribe({
      next: (contacts) => this.data = contacts,
    });
  }

  onRowClick(contact: Contact) {
    this.openEditModal(contact);
  }

  openEditModal(contact: Contact) {
    this.selectedContact = { ...contact };
  }

  closeEditModal(updatedContact: Contact | null) {
    if (updatedContact) {
      const index = this.data.findIndex(c => c.contactid === updatedContact.contactid);
      if (index !== -1) {
        this.data[index] = updatedContact;
      } else {
        this.data.push(updatedContact);
      }
    }
    this.selectedContact = null;
    this.fetchData(); // Refresh the table data
  }


}
