import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
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
  snackbar: any;
getRole() {
throw new Error('Method not implemented.');
}
  private apiUrl = 'http://localhost:8089/pi/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, request, { withCredentials: true }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      }),
      catchError(err => {
        if (err.error.message === 'Your account is not approved yet.') {
          this.snackbar.open('Account pending approval by admin.', 'Close', { duration: 3000 });
        } else {
          this.snackbar.open('Login failed. Check credentials.', 'Close', { duration: 3000 });
        }
        throw err;
      })
    );
  }
  
  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }
  
  // Redirects to the backend OAuth2 endpoint
  loginWithGoogle(): void {
    localStorage.clear();
    window.location.href = 'http://localhost:8089/pi/oauth2/authorization/google';
  }
  
  // Handles the redirect from OAuth2 login
  handleOAuth2Redirect(token: string): void {
    if (!token) {
      this.router.navigate(['/front/login'], { queryParams: { error: 'auth_failed' } });
      return;
    }
    
    localStorage.setItem('token', token);
    
    // Decode token to get user role
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const role = tokenPayload.role;
      
      if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin/profile']);
      } else {
        this.router.navigate(['/front/profile']);
      }
    } catch (error) {
      console.error('Error decoding token', error);
      this.router.navigate(['/front/login'], { queryParams: { error: 'invalid_token' } });
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
  
  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }
}
