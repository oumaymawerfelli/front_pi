// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  
  private baseUrl = 'http://localhost:8089/pi/api';
  
  constructor(private http: HttpClient) {}

  // ✅ Corrected - no need to store authToken in class field
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Optionally you can decode and check token expiry here
    return !!token;
  }
<<<<<<< Updated upstream
  createLoanRequest(loanRequest: any, userId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/loan-request?userId=${userId}`, loanRequest);
  }
  
  
  addEquipment(equipment: any) {
    return this.http.post('http://localhost:8089/pi/api/equipments', equipment);
=======

  clearAuthToken(): void {
    localStorage.removeItem('token'); // ✅ Also remove from storage
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const token = localStorage.getItem('token'); // Always get fresh token
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.clearAuthToken();
      return throwError(() => new Error('Session expired. Please login again.'));
    } else if (error.status >= 400 && error.status < 600) {
      // Other client or server errors, no logout
      const errorMessage = error.error?.message || 'Something went wrong. Please try again.';
      return throwError(() => new Error(errorMessage));
    } else {
      // Network errors or unexpected cases
      return throwError(() => new Error('An unexpected error occurred. Please try again later.'));
    }
  }    


  // ----------- API Calls --------------

  getOwners(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8089/pi/api/loan-request/owners', {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  addEquipment(equipment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/equipments`, equipment, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  createLoanRequest(loanRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/loan-request`, loanRequest, { // ✅ Clean endpoint
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // No Bearer here
    }).pipe(
      catchError(this.handleError.bind(this))
    );
>>>>>>> Stashed changes
  }
  
}
