import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvestmentHistory } from 'src/app/models/investment-history';

@Injectable({
  providedIn: 'root'
})
export class InvestmentHistoryService {
  private apiUrl = 'http://localhost:8089/pi/api/investment-history';

  constructor(private http: HttpClient) { }

  getHistoryByInvestmentId(investmentId: number): Observable<InvestmentHistory[]> {
    return this.http.get<InvestmentHistory[]>(`${this.apiUrl}/${investmentId}`);
  }
}
