import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonDirective,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  TooltipModule
} from '@coreui/angular';
import { Contact } from '../../../models/contact.model';
import { ContactsApiService } from '../contactsAPI';
import { ToastService } from '../../../utils/toast.service';

import { IconSubset, iconSubset } from '../../../icons/icon-subset';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
// import { FormControlDirective, FormLabelDirective } from '@coreui/angular-pro';

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
    IconDirective,
    TooltipModule,
    // FormControlDirective,
    // FormLabelDirective,

  ],
  providers: [IconSetService],
  templateUrl: './contact-edit-modal.component.html',
  styleUrls: ['./contact-edit-modal.component.scss'],
})
export class ContactEditModalComponent implements OnChanges {
  @Input() contact: Contact | null | undefined;
  @Output() closeModal = new EventEmitter<Contact | null>();
  @Input() isNew: boolean = false;

  isVisible = false;
  isVisibleModal = true;
  isEditMode = false;

  emailError = '';
  phoneError = '';
  addrError = '';

  data: Contact[] = [];
  public icons!: [string, string[]][];

  tooltipQuickEdit = 'Editare rapida';
  tooltipkEdit = 'Editare';


  constructor(
    private contactsService: ContactsApiService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    public iconSet: IconSetService,
    private router: Router
  ) {
    iconSet.icons = { ...iconSubset };
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact'] && this.contact) {
      this.isVisible = true;
      this.isEditMode = false; // Always start in view mode
    }
  }

  onVisibleChange(isVisible: boolean) {
    this.isVisible = isVisible;
    if (!isVisible) {
      this.closeModal.emit(null);
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  save() {
    if (this.contact) {
      if (this.isNew) {
        this.contactsService.createData(this.contact).subscribe({
          next: (newContact) => {
            this.toastService.showSuccessToast('Contact added successfully.');
            this.isVisible = false;
            this.closeModal.emit(newContact);
            this.cdr.detectChanges(); // Manually trigger change detection
          },
          error: (err) => {
            if (err.status === 409 && err.error.code === '23505') {
              this.handleDuplicateError(err.error.message);
            } else {
              this.toastService.showFailureToast('An error occurred: ' + err.error.message);
            }
          }
        });
      } else {
        this.contactsService.updateData(this.contact).subscribe({
          next: (updatedContact) => {
            this.toastService.showSuccessToast('Contact updated successfully.');
            this.isVisible = false;
            this.closeModal.emit(updatedContact);
            this.cdr.detectChanges(); // Manually trigger change detection
          },
          error: (err) => {
            if (err.status === 409 && err.error.code === '23505') {
              this.handleDuplicateError(err.error.message);
            } else {
              this.toastService.showFailureToast('An error occurred: ' + err.message);
            }
          }
        });
      }
    }
  }

  handleDuplicateError(message: string) {
    this.resetErrorStates();
    if (message.includes('contacts_email_key')) {
      this.emailError = 'Duplicate email error: ' + message;
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
          this.toastService.showSuccessToast('Contact deleted successfully.');
          this.isVisible = false;
          this.closeModal.emit(deletedContact);
          this.cdr.detectChanges(); // Manually trigger change detection
        },
        error: (err) => {
          this.toastService.showFailureToast('An error occurred: ' + err.message);
        }
      });
    }
  }

  navigateToDetail() {
    if (this.contact) {
      this.onClose();
      this.router.navigate([`/contacts/${this.contact.contactid}`]);
    }
  }
}
