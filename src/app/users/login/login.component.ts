import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

  // In login.component.ts

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }
    
    const request: LoginRequest = { email: this.email, password: this.password, captchaToken: this.captchaToken };
  
    // First, login the user
    this.authService.login(request).subscribe({
      next: (_) => { // No token yet, only OTP sent
        const otp = prompt("Please enter the OTP sent to your phone:");
        
        if (otp) {
          // Call OTP verification API
          this.authService.verifyOtp(this.email, otp).subscribe({
            next: (loginResponse) => {
              localStorage.setItem('token', loginResponse.token); // Save token after OTP verified
  
              if (this.authService.isAdmin()) {
                this.router.navigate(['/admin/profile']);
              } else {
                this.router.navigate(['/home']);
              }
            },
            error: (err) => {
              this.errorMessage = err?.error?.message || 'Invalid OTP';
            }
          });
        }
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Invalid email or password';
      }
    });
  }
  

  

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithLinkedIn(): void {
    this.authService.loginWithLinkedin();
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  loginWithGitHub(): void {
    this.authService.loginWithGitHub();
  }
  
  
}