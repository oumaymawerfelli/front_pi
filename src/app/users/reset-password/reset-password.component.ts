import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token: string = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.token = token;
      } else {
        this.snackbar.open('Invalid password reset link.', 'Close', { duration: 3000 });
        this.router.navigate(['/landing/login']);
      }
    });
  
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  

  onSubmit(): void {
    if (this.resetForm.invalid || this.resetForm.value.password !== this.resetForm.value.confirmPassword) {
      this.snackbar.open('Passwords must match and be at least 6 characters long.', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;

    this.authService.resetPassword(this.token, this.resetForm.value.password).subscribe({
      next: () => {
        this.snackbar.open('Password successfully reset.', 'Close', { duration: 3000 });
        this.router.navigate(['/landing/login']);
      },
      error: () => {
        this.snackbar.open('Failed to reset password. Try again.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
