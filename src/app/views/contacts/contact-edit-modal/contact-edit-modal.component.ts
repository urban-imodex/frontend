import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonDirective,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective
} from '@coreui/angular';
import { Contact } from '../../../models/contact.model';
import { ContactsApiService } from '../contactsAPI';
import { ToastService } from '../../../utils/toast.service';

@Component({
  selector: 'app-contact-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
  ],
  templateUrl: './contact-edit-modal.component.html',
  styleUrls: ['./contact-edit-modal.component.scss'],
})
export class ContactEditModalComponent implements OnChanges {
  @Input() contact: Contact | null | undefined;
  @Output() closeModal = new EventEmitter<Contact | null>();
  @Input() isNew: boolean = false;

  isVisible = false;
  isVisibleModal = true;

  emailError = '';
  phoneError = '';
  addrError = '';

  data: Contact[] = [];

  constructor(
    private contactsService: ContactsApiService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact'] && this.contact) {
      this.isVisible = true;
    }
  }

  onVisibleChange(isVisible: boolean) {
    this.isVisible = isVisible;
    if (!isVisible) {
      this.closeModal.emit(null);
    }
  }


  save() {
    if (this.contact) {
      if (this.isNew) {
        console.log("save() is New in new on edit modal");
        this.contactsService.createData(this.contact).subscribe({
          next: (newContact) => {
            this.toastService.showSuccessToast('Contact ADAUGAT cu success.');
            this.isVisible = false;
            // this.contactsService.getData();
            this.closeModal.emit(newContact);
            this.cdr.detectChanges(); // Manually trigger change detection
          }, 
          error: (err) => {
            if (err.status === 409 && err.error.code === '23505') {
              this.handleDuplicateError(err.error.message);
            } else {
              this.toastService.showFailureToast('Oups, a aparut o eroare ' + err.message);
            }
          }
        });
      } else {
        console.log("save() in new on edit modal");
        this.contactsService.updateData(this.contact).subscribe({
          next: (updatedContact) => {
            this.toastService.showSuccessToast('Contact editat cu success.');
            this.isVisible = false;
            this.closeModal.emit(updatedContact);
            this.cdr.detectChanges(); // Manually trigger change detection
          },
          error: (err) => {
            if (err.status === 409 && err.error.code === '23505') {
              this.handleDuplicateError(err.error.message);
            } else {
              this.toastService.showFailureToast('Oups, a aparut o eroare ' + err.message);
            }
          }
        });
      }
    }
  }

  handleDuplicateError(message: string) {
    this.resetErrorStates();
    if (message.includes('contacts_email_key')) {
      this.emailError = 'Duplicate! email error: ' + message;
    } else if (message.includes('contacts_phone_key')) {
      this.phoneError = 'Duplicate phone error: ' + message;
    } else if (message.includes('contacts_addr_key')) {
      this.addrError = 'Duplicate address error: ' + message;
    } else {
      this.toastService.showFailureToast('Duplicate entry error: ' + message);
    }
  }

  resetErrorStates() {
    this.emailError = '';
    this.phoneError = '';
    this.addrError = '';
  }

  onClose() {
    this.isVisible = false;
    this.closeModal.emit(null);
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  delete() {
    if (this.contact) {
      this.contactsService.deleteData(this.contact).subscribe({
        next: (deletedContact) => {
          this.toastService.showSuccessToast('Contact sters cu success.');
          this.isVisible = false;
          this.closeModal.emit(deletedContact);
          this.cdr.detectChanges(); // Manually trigger change detection
        },
        error: (err) => {
          this.toastService.showFailureToast('Oups, a aparut o eroare ' + err.message);
        }
      });
    }
  }
}
