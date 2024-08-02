import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, signal } from '@angular/core';
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
} from '@coreui/angular';
import { IItem, SmartTableComponent, TableColorDirective, TemplateIdDirective, ToasterComponent, ToasterPlacement } from '@coreui/angular-pro';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ContactEditModalComponent,
    ButtonDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    SmartTableComponent,
    TableColorDirective,
    TemplateIdDirective,
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
  // data$!: Observable<Contact[] | unknown> | undefined;
  columns: any[] = [
    { key: 'firstname', label: 'First Name' },
    { key: 'lastname', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'addr', label: 'Address' },
    { key: 'createdat', label: 'Created At' }
  ];

  selectedContact: Contact | null = null;
  isNewContact: boolean = false;
  // selectedItemsCount: any;
  readonly selectedItemsCount = signal(0);


  constructor(private contactsService: ContactsApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.contactsService.getData().subscribe({
      next: (contacts) => {
        this.data = contacts;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
    });
  }

  onRowClick(contact: Contact) {
    this.openEditModal(contact);
  }


  openEditModal(contact: Contact) {
    this.isNewContact = false;
    this.selectedContact = { ...contact };
  }

  openNewContactModal() {
    this.isNewContact = true;
    this.selectedContact = {
      contactid: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      addr: '',
      userID: '',
      createdat: new Date().toISOString()
    };
  }

  closeEditModal(updatedContact: Contact | null) {
    if (updatedContact) {
      const index = this.data.findIndex((c) => c.contactid === updatedContact.contactid);
      if (index !== -1) {
        this.data[index] = updatedContact;
      } else {
        this.data.push(updatedContact);
      }
    }
    this.selectedContact = null;
    this.isNewContact = false;
    this.fetchData(); // Refresh the table data
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  saveNewContact(newContact: Contact | null) {
    if (newContact?.firstname) {
      this.contactsService.createData(newContact).subscribe({
        next: (createdContact) => {
          this.data.push(createdContact);
          this.selectedContact = null;
          this.isNewContact = false;
          this.fetchData(); // Refresh the table data
          this.cdr.detectChanges(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Error creating contact:', err);
        },
        complete: () => {
          this.selectedContact = null;
          this.isNewContact = false;
        }
      });
    }
    this.selectedContact = null;
    this.isNewContact = false;
    this.fetchData(); // Refresh the table data
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  // onSelectedItemsChange(selectedItems: IItem[]) {
  //   this.selectedItemsCount.set(selectedItems.length ?? 0);
  // }
}
