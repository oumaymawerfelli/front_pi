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
  role = 'ROLE_CUSTOMER'; // Adjust the default role as needed

  constructor(private authService: AuthService) {}

  register(): void {
    const request: RegisterRequest = { name: this.name, email: this.email, password: this.password, role: this.role };
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
