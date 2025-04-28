import { Component } from '@angular/core';
import { AuthService, RegisterRequest } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = 'ROLE_CUSTOMER'; 
  phone = '';

  constructor(private authService: AuthService) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const request: RegisterRequest = { 
      name: this.name, 
      email: this.email, 
      password: this.password, 
      confirmPassword: this.confirmPassword, 
      role: this.role, 
      phone: this.phone 
    };
    this.authService.register(request).subscribe({
      next: (response) => {
        console.log('User registered:', response);
      },
      error: (error) => {
        console.error('Registration error:', error);
      }
    });
  }
}
