import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface LoginRequest {
  email: string;
  password: string;
  captchaToken: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone: string;
}

export interface JwtResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

getRole() {
throw new Error('Method not implemented.');
}
  private apiUrl = 'http://localhost:8089/pi/auth';

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) {}
 

  login(request: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, request, { withCredentials: true }).pipe(
      catchError(err => throwError(() => err))
    );
  }
  

verifyOtp(email: string, otp: string): Observable<JwtResponse> {
  const url = `${this.apiUrl}/verify-otp`;
  return this.http.post<JwtResponse>(url, { email, otp }).pipe(
    tap(response => {
      localStorage.setItem('token', response.token);  // Store JWT token after OTP verification
    }),
    catchError(err => throwError(() => err))
  );
}


      
    
  
  
  
  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }
  

  loginWithGoogle(): void {
    localStorage.clear();
    window.location.href = 'http://localhost:8089/pi/oauth2/authorization/google';
  }
  

  handleOAuth2Redirect(token: string): void {
    if (!token) {
      this.router.navigate(['/home/login'], { queryParams: { error: 'auth_failed' } });
      return;
    }
    
    localStorage.setItem('token', token);
    

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const role = tokenPayload.role;
      
      if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin/profile']);
      } else {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error decoding token', error);
      this.router.navigate(['/home/login'], { queryParams: { error: 'invalid_token' } });
    }
  }
  
  getProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:8089/pi/profile/profile', { headers });
  }
  
  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role || null;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
  
  loginWithLinkedin(): void {
    localStorage.clear();
    window.location.href = 'http://localhost:8089/pi/oauth2/authorization/linkedin';
  }
  
  
  
  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }

  forgotPassword(email: string): Observable<any> {
    const url = `${this.apiUrl}/forgot-password`;
    return this.http.post(url, { email }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/reset-password`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(url, { token, newPassword }, { headers });
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/profile/profile');
  }

  loginWithFacebook(): void {
    localStorage.clear();
    window.location.href = 'http://localhost:8089/pi/oauth2/authorization/facebook';
  }

  loginWithGitHub(): void {
    localStorage.clear();
    window.location.href = 'http://localhost:8089/pi/oauth2/authorization/github';
  }
  
  
  
  
  
}
