// loan-request.service.ts

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoanRequestRecommendation {
  idReq: number;
  loanPurpose: string;
  loanDuration: number;
  borrowerName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {
  private apiUrl = 'http://localhost:8089/pi/api/loan-requests/recommendations';

  constructor(private http: HttpClient) {}

  getRecommendations(keyword: string): Observable<LoanRequestRecommendation[]> {
    const token = localStorage.getItem('access_token'); // récupère ton Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('keyword', keyword);

    return this.http.get<LoanRequestRecommendation[]>(this.apiUrl, { headers, params });
  }
}
