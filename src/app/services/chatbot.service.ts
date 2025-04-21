import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8095/products/chat'; // URL de ton backend Spring Boot

  constructor(private http: HttpClient) {}

/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Sends a message to the chatbot server and returns the server's response.
   * 
   * @param message - The message to send to the chatbot.
   * @returns An Observable containing the server's response as a plain text.
   */

/*******  b8a97c28-5250-4cf6-9e63-9e9f3e002e79  *******/
sendMessage(message: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(this.apiUrl, { message }, {
    headers,
    withCredentials: true // nécessaire si allowCredentials = true côté Spring
  });
}

}
