import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    accept: false
  };

  constructor() {
    this.errorMessages = {
      firstname: {
        required: 'First name is required'
      },
      lastname: {
        required: 'Last name is required'
      },
      email: {
        required: 'required',
        email: 'Invalid email address'
      },
      phone: {
        required: 'phone date required'
      },
      addrcounty: {
        requiredTrue: 'addrcounty required!!'
      },
      addrtown: {
        requiredTrue: 'addrtown required!!'
      },
      addraddr: {
        requiredTrue: 'addraddr required!!'
      },
      privatenote: {
        requiredTrue: 'privatenote required!!'
      }
      
    };
  }
}