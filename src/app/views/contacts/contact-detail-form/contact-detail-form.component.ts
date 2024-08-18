import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';

// import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactsApiService } from '../contactsAPI';
import { ValidationFormsService } from './validation-forms.service';

// import { FormControlDirective, FormLabelDirective, FormFloatingDirective, FormCheckLabelDirective, Bu } from '@coreui/angular-pro';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import {
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ColDirective,
  DatePickerComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  RowComponent,
  TextColorDirective,
  InputGroupComponent
} from '@coreui/angular-pro';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../../models/contact.model';


/** passwords must match - custom validator */
export class PasswordValidators {

  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (password?.valid && password?.value === confirm?.value) {
      confirm?.setErrors(null);
      return null;
    }
    confirm?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
}


@Component({
  selector: 'app-contact-detail-form',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    ReactiveFormsModule,
    FormDirective,
    ColDirective,
    FormLabelDirective,
    NgIf,
    FormControlDirective,
    FormFeedbackComponent,
    DatePickerComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonGroupComponent,
    ButtonDirective,
    TextColorDirective,
    InputGroupComponent,
    CardComponent,
    NgClass,
    CardBodyComponent,
    NgFor,
    JsonPipe
  ],
  providers: [ValidationFormsService],

  templateUrl: './contact-detail-form.component.html',
  styleUrl: './contact-detail-form.component.scss'
})





export class ContactDetailFormComponent implements OnChanges, OnInit {
  @Input() contact: any;
  contactForm!: FormGroup;
  submitted = false;
  formErrors: any;
  formControls!: string[];
  contactId: any;

  // constructor(private fb: FormBuilder, private contactService: ContactsApiService) {
  // this.contactForm = this.fb.group({
  //   firstname: ['', [Validators.required]],
  //   lastname: ['', [Validators.required]],
  //   email: ['', [Validators.required, Validators.email]],
  //   phone: [''],
  //   addrcounty: [''],
  //   addraddr: [''],
  //   addrtown: ['']
  // });
  // }

  constructor(
    private formBuilder: FormBuilder,
    public validationFormsService: ValidationFormsService,
    private contactService: ContactsApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formErrors = this.validationFormsService.errorMessages;
    this.createForm();
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('contactid');
    console.log(this.contactId)
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((contact: any) => {
        this.contactForm.patchValue(contact[0]);
        console.log(contact[0]);
      });

    }
  }

  createForm() {
    this.contactForm = this.formBuilder.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.required]],

        addrcounty: ['', [Validators.required,]],
        addrtown: ['', [Validators.required]],
        addraddr: ['', [Validators.required,]],
        privatenote: [''],





      },
      // { validators: [PasswordValidators.confirmPassword] }
    );
    this.formControls = Object.keys(this.contactForm.controls);
  }

  ngOnChanges() {
    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  onReset() {
    this.submitted = false;
    this.contactForm.reset();
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.contactForm.status === 'VALID';
  }

  save2() {
    if (this.contactForm.valid) {
      console.log("id..", this.contactForm.value);
      this.contactService.updateData(this.contactId).subscribe();
    }
  }

  save() {
    if (this.contactForm.valid) {
      // Map form values to the expected API payload structure
      const payload: Contact = {
        contactid: this.contactId,  // Ensure contactId is set correctly
        firstname: this.contactForm.value.firstname,
        lastname: this.contactForm.value.lastname,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        addraddr: this.contactForm.value.addraddr,
        addrcounty: this.contactForm.value.addrcounty,
        addrtown: this.contactForm.value.addrtown,
        privatenote: this.contactForm.value.privatenote,
        // Add any other required fields here
      };

      console.log("Payload to be sent: ", payload);

      // Pass the payload to updateData
      this.contactService.updateData(payload).subscribe(
        response => {
          console.log('Contact updated successfully', response);
          this.router.navigate(['/contacts']); // Navigate after successful update
        },
        error => {
          console.error('Error updating contact', error);
        }
      );
    }
  }

  cancel(){
    this.router.navigate(['/contacts']);
  }



  onSubmit() {
    console.warn(this.onValidate(), this.contactForm.value);

    if (this.onValidate()) {
      this.save();
      console.warn(this.contactForm.value);
      // alert('SUCCESS!');
    }
  }

}