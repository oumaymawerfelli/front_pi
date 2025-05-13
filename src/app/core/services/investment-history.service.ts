import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvestmentHistory } from 'src/app/core/models/investment-history';
import { environment } from 'src/environnement/env';

@Injectable({
  providedIn: 'root'
})
export class InvestmentHistoryService {
  private apiUrl = environment.apiUrl+'/pi/api/investment-history';

  constructor(private http: HttpClient) { }

  getHistoryByInvestmentId(investmentId: number): Observable<InvestmentHistory[]> {
    return this.http.get<InvestmentHistory[]>(`${this.apiUrl}/${investmentId}`);
  }
}
