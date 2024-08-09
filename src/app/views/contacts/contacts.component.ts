import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconSubset, iconSubset } from '../../icons/icon-subset';
import { IconDirective, IconSetService } from '@coreui/icons-angular';

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
import { IItem, SmartTableComponent, TableColorDirective, TemplateIdDirective } from '@coreui/angular-pro';

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
    TextColorDirective,
    IconDirective
  ],
  providers: [IconSetService],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  data: Contact[] = [];
  columns: any[] = [
    { key: 'firstname', label: 'Prenume',  _data: { tooltip: 'User Name', icon: 'cilUser' } },
    { key: 'lastname', label: 'Nume',  _data: { tooltip: 'User Name', icon: 'cilUser' } },
    { key: 'email', label: 'E-mail',  _data: { tooltip: 'User Name', icon: 'cilUser' } },
    { key: 'phone', label: 'Telefon',  _data: { tooltip: 'User Name', icon: 'cilUser' } },
    { key: 'addraddr', label: 'Adresă',  _data: { tooltip: 'User Name', icon: 'cilUser' } },
    { key: 'createdat', label: 'Adăugat la',  _data: { tooltip: 'User Name', icon: 'cilUser' } },
    // { key: 'show', label: '', _style: { width: '5%' }, filter: false, sorter: false }
  ];

  selectedContact: Contact | null = null;
  isNewContact: boolean = false;
  readonly selectedItemsCount = signal(0);
  selectedItems: Contact[] = [];
  // icons = { cilUser };
  

  constructor(private contactsService: ContactsApiService, private cdr: ChangeDetectorRef, private router: Router) {}

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

  // onRowClick(contact: Contact, event: Event) {
  //   const targetElement = event.target as HTMLElement;
  //   console.log("onRowClick START");

  //   if (this.isCheckboxClick(targetElement)) {
  //     console.log("onROwClick checking for checkbox click", targetElement);
  //     // Checkbox click, do nothing
  //     return;
  //   }
  //   console.log("onRowClick END!");
  //   this.openEditModal(contact);
  // }

  

  // isCheckboxClick(element: HTMLElement | null): boolean {
  //   return element?.closest('input[type="checkbox"]') !== null;
  // }

  onRowClick(contact: Contact, event: { event: Event }) {
    console.log("onRowClick START");
  
    // Log the event object to inspect its structure
    console.log("Event:", event);
  
    // Extract the nested event
    const nestedEvent = event.event as MouseEvent;
    console.log("Nested Event:", nestedEvent);
  
    // Access target element from the nested event
    const targetElement = nestedEvent.target as HTMLElement;
    console.log("Event target:", targetElement);
  
    if (!targetElement) {
      console.log("Event target is null or undefined");
      return;
    }
  
    console.log("Event target tag:", targetElement.tagName);
  
    // Check if the click is on a checkbox
    if (this.isCheckboxClick(targetElement)) {
      console.log("onRowClick: Clicked on a checkbox or within a checkbox container");
      return;
    }
  
    console.log("onRowClick END!");
    this.openEditModal(contact);
  }
  
  isCheckboxClick(element: HTMLElement | null): boolean {
    if (!element) return false;
  
    // Check if the element or any of its ancestors are a checkbox input
    let currentElement: HTMLElement | null = element;
    while (currentElement) {
      console.log("Checking element:", currentElement);
      if (currentElement.tagName === 'INPUT' && currentElement.getAttribute('type') === 'checkbox') {
        return true;
      }
      // Check if the parent element is a label containing a checkbox
      if (currentElement.tagName === 'LABEL' && currentElement.querySelector('input[type="checkbox"]')) {
        return true;
      }
      currentElement = currentElement.parentElement; // Move up the DOM tree
    }
  
    return false;
  }
  
  
  

  

  onSelectedItemsChange(selectedItems: IItem[]) {
    this.selectedItems = selectedItems as Contact[];
    this.selectedItemsCount.set(selectedItems.length ?? 0);
    console.log('Selected items changed(', this.selectedItems.length ,'):', this.selectedItems); // Debugging line
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
      addrcounty: '',
      addrtown: '',
      addraddr: '',
      privatenote: '',
      // agentid: '',
      // orgid: '',
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

  performActionOnSelected() {
    if (this.selectedItems.length > 0) {
      console.log('Performing action on selected items:', this.selectedItems);
      // Implement your action logic here, e.g., bulk update, delete, etc.
    } else {
      console.log('No items selected.');
    }
  }

  hasSelectedItems(): boolean {
    return this.selectedItems.length > 0;
  }

  openContactDetail(contact: Contact) {
    this.router.navigate([`/contacts/${contact.contactid}`]);
  }
}
