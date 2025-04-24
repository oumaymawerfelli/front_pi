import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() userToEdit: User | null = null;
  @Output() userSubmitted = new EventEmitter<User>();

  // Initialize form without ID
  userForm: Omit<User, 'idUser'> & { idUser?: number } = {
    name: '',
    email: '',
    password: '',
    role: 'USER',
    address: '',
    phone: '',
    cin: 0,
    enabled: true,
    dateOfBirth: new Date(),
    service: '',
    paymentInfo: '',
    companyName: '',
    profilePicture: '',
    institution: '',
    status: ''
  };

  ngOnChanges(): void {
    if (this.userToEdit) {
      // Clone the user to edit
      this.userForm = { ...this.userToEdit };
    } else {
      // Reset form for new user (without ID)
      this.resetForm();
    }
  }

  onSubmit(): void {
    this.userSubmitted.emit(this.userForm as User);
  }

  resetForm(): void {
    this.userForm = {
      name: '',
      email: '',
      password: '',
      role: 'USER',
      address: '',
      phone: '',
      cin: 0,
      enabled: true,
      dateOfBirth: new Date(),
      service: '',
      paymentInfo: '',
      companyName: '',
      profilePicture: '',
      institution: '',
      status: ''
    };
  }
}