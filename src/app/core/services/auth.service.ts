import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Si vous utilisez Angular Material pour les alertes

export interface LoginRequest {
  email: string;
  password: string;
  captchaToken: string;
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
  private apiUrl = 'http://localhost:8089/pi/auth';
  private readonly tokenKey = 'token';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private snackbar: MatSnackBar // Injection du MatSnackBar pour afficher les messages
  ) {}

  login(request: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, request, { withCredentials: true }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      }),
      catchError(err => {
        this.handleAuthError(err);
        throw err; // Relance l'erreur pour que l'appelant puisse gérer aussi
      })
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

    localStorage.setItem(this.tokenKey, token);

    // Decode token pour obtenir le rôle utilisateur
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const role = tokenPayload.role;

      if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin/profile']);
      } else {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token', error);
      this.router.navigate(['/home/login'], { queryParams: { error: 'invalid_token' } });
    }
  }

  getProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:8089/pi/profile/profile', { headers });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/home/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role || null;
    } catch (error) {
      console.error('Erreur lors du décodage du token', error);
      return null;
    }
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

  getUserInfo(): { role: string | null, userId: number | null } {
    const token = this.getToken();
    if (!token) return { role: null, userId: null };

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const role = decodedToken.role || null;
      const userId = decodedToken.sub || null; // ID de l'utilisateur supposé être dans le "sub" du token
      return { role, userId };
    } catch (error) {
      console.error('Erreur lors du décodage du token', error);
      return { role: null, userId: null };
    }
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private handleAuthError(err: any): void {
    if (err.error?.message === 'Your account is not approved yet.') {
      this.snackbar.open('Account pending approval by admin.', 'Close', { duration: 3000 });
    } else {
      this.snackbar.open('Login failed. Check credentials.', 'Close', { duration: 3000 });
    }
  }
}
