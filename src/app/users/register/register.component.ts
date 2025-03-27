import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'USER'; // Default role

  constructor(private authService: AuthService) {}

  register() {
    const user = { name: this.name, email: this.email, password: this.password, role: this.role };
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User registered:', response);
      },
      error: (error) => {
        console.error('Registration error:', error);
      }
    });
  }
}
