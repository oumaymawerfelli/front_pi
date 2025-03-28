import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/front/profile']); // Redirect to a dashboard or home page
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}


