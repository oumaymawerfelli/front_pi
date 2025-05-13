// src/app/services/investment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from 'src/app/core/models/investor';
import { AuthService } from  'src/app/core/services/auth.service';
import { environment } from 'src/environnement/env';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private apiUrl = environment.apiUrl+'/pi/investments'; // adapte l'URL si besoin

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAllInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(`${this.apiUrl}/get-all-Investments`, { headers: this.getAuthHeaders() });
  }

  getInvestmentById(id: number): Observable<Investment> {
    return this.http.get<Investment>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addInvestment(investment: Investment): Observable<Investment> {
    return this.http.post<Investment>(`${this.apiUrl}/addInvestment`, investment,{ headers: this.getAuthHeaders() } );
  }

  updateInvestment(id: number, investment: Investment): Observable<Investment> {
    return this.http.put<Investment>(`${this.apiUrl}/update/${id}`, investment, { headers: this.getAuthHeaders() });
  }

  deleteInvestment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateInvestmentPerformance(id: number): Observable<Investment> {
    return this.http.put<Investment>(`${this.apiUrl}/${id}/performance`, {}, { headers: this.getAuthHeaders() });
  }
}
