import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8089/pi/api'; // Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getHello(): Observable<string> {
    return this.http.get(`${this.baseUrl}/hello`, { responseType: 'text' });
  }
  createLoanRequest(loanRequest: any, userId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/loan-request?userId=${userId}`, loanRequest);
  }
  
  
  addEquipment(equipment: any) {
    return this.http.post('http://localhost:8089/pi/api/equipments', equipment);
  }
  
}
