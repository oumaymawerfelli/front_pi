import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() userToEdit: User | null = null;  // Input property for the user being edited
  @Output() userSubmitted = new EventEmitter<User>();  // Output event to notify when form is submitted

  userForm: User = {
    idUser: 0,
    name: '',
    email: '',
    password: '',
    role: 'USER',  // Default role
    phone: '',
    adresse: '',
    cin: 0,
    enabled: true,
    profilePicture: null,
    dateOfBirth: new Date(),
    service: '',
    paymentInfo: '',
    companyName: '',
    institution: null
  };

  ngOnChanges(): void {
    if (this.userToEdit) {
      // If a user is being edited, populate the form with user data
      this.userForm = { ...this.userToEdit };  // Clone the user to avoid mutating the input
    }
  }

  onSubmit(): void {
    this.userSubmitted.emit(this.userForm);  // Emit the submitted user data
    this.resetForm();  // Optionally reset the form after submission
  }

  resetForm(): void {
    this.userForm = {
      idUser: 0,
      name: '',
      email: '',
      password: '',
      role: 'USER',
      phone: '',
      adresse: '',
      cin: 0,
      enabled: true,
      profilePicture: null,
      dateOfBirth: new Date(),
      service: '',
      paymentInfo: '',
      companyName: '',
      institution: null
    };
  }
}
