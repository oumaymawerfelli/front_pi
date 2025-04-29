import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = 'http://localhost:8089/api/ai/ask'; // Adaptez à votre URL backend

  constructor(private http: HttpClient) { }

  askQuestion(question: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, question, {
      headers: { 'Content-Type': 'application/text' } // Adaptez selon votre API
    });
  }
}