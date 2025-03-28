import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface JwtResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8089/pi/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, request, {
      withCredentials: true
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);  // Store the token here
      })
    );
  }
  

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(
        'http://localhost:8089/pi/auth/register', 
        request, 
        { 
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true
        }
    );
}
getProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    return of(null); // Return an observable of null if no token
  }
  
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>('http://localhost:8089/pi/profile/profile', { headers });
}

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}