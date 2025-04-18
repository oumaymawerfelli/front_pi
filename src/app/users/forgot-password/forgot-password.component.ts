import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (!this.email) {
      this.snackbar.open('Please enter your email.', 'Close', { duration: 3000 });
      return;
    }

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.snackbar.open('Password reset email sent.', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackbar.open('Failed to send reset email.', 'Close', { duration: 3000 });
      }
    });
  }
}