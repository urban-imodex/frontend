import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonDirective,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective
} from '@coreui/angular';
import { Contact } from '../../../models/contact.model';
import { ContactsApiService } from '../contactsAPI';


@Component({
  selector: 'app-contact-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule,
    ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent,    
  ],
  templateUrl: './contact-edit-modal.component.html',
  styleUrls: ['./contact-edit-modal.component.scss'],
  host: {'some-binding': 'some-value'},
})
export class ContactEditModalComponent implements OnChanges {
  @Input() contact: Contact | null | undefined;
  @Output() closeModal = new EventEmitter<Contact | null>();


  isVisible = false;
  isVisibleModal = true;

  showToast = false;
  toastTitle = '';
  toastMessage = '';
  toastClass = '';

  constructor(private contactsService: ContactsApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact']) {
      if (this.contact) {
        this.isVisible = true;
      }
    };
  }

  onVisibleChange(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  save() {
    if (this.contact) {
      this.contactsService.updateData(this.contact).subscribe({
        next: (updatedContact) => {
          console.log('Contact updated successfully:', updatedContact);
          this.closeModal.emit(updatedContact);
        },
        error: (err) => {
          console.error('Error updating contact:', err);

        }
      });
    }
  }

  onClose() {
    this.isVisible = false;
    this.closeModal.emit(null);
  }

  delete() {
    if (this.contact) {
      this.contactsService.deleteData(this.contact).subscribe({
        next: (updatedContact) => {
          console.log('Contact deleted successfully:', updatedContact);
          this.closeModal.emit(updatedContact);

        },
        error: (err) => {
          console.error('Error updating contact:', err);
        }
      });
    }
  }
}
