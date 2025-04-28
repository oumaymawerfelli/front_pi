// src/app/services/investment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from 'src/app/models/investor';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private apiUrl = 'http://localhost:8089/pi/investments'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) { }

  // Récupérer tous les investissements
  getAllInvestments(): Observable<any> {
    const header = this.createAuthorizedHeader()
    if(header){
      return this.http.get<any[]>(this.apiUrl + '/get-all-Investments',{headers: header});
    }else{
      throw new Error('No token found');
    }
   
  }

  addInvestment(investment: Investment): Observable<any> {

    return this.http.post<Investment>(`${this.apiUrl}/addInvestment`, investment, );
 
 
}


  // Mettre à jour un investissement
  updateInvestment(id: number, investment: Investment): Observable<Investment> {
    return this.http.put<Investment>(`${this.apiUrl}/${id}`, investment, { withCredentials: true });
  }

  // Récupérer un investissement par ID
  getInvestmentById(id: number): Observable<Investment> {
    return this.http.get<Investment>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Supprimer un investissement
  deleteInvestment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Mettre à jour la performance d'un investissement
  updateInvestmentPerformance(id: number): Observable<Investment> {
    return this.http.put<Investment>(`${this.apiUrl}/${id}/performance`, {}, { withCredentials: true });
  }

  // Mettre à jour le montant d'un investissement
  updateInvestmentAmount(id: number, newAmount: number, performedBy: string): Observable<Investment> {
    const params = new HttpParams()
      .set('newAmount', newAmount.toString())
      .set('performedBy', performedBy);
    return this.http.put<Investment>(`${this.apiUrl}/${id}/update-amount`, null, {
      params,
      withCredentials: true
    });
  }
  private createAuthorizedHeader(): HttpHeaders | null {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.log('No token found');
      return null;
    }
  }
}
