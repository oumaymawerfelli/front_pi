import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  captchaToken: string = '';

  onCaptchaResolved(token: string) {
    this.captchaToken = token;
  }

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }
    const request: LoginRequest = {
      email: this.email,
      password: this.password,
      captchaToken: this.captchaToken,
    };
    this.authService.login(request).subscribe({
      next: (response) => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin/profile']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      },
    });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  loginWithGitHub(): void {
    this.authService.loginWithGitHub();
  }
}
