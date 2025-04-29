import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage = '';
  botResponse = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer a5922fb1cd51f52492164299208f1ec6258ce81e38b567dda0e490e95246a261`,  // Remplace par ta vraie clé, attention "Bearer"
      'Content-Type': 'application/json'
    });

    const body = {
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",  // Attention à bien écrire le modèle exact
      messages: [
        { role: "user", content: this.userMessage }
      ],
      temperature: 0.7,
      max_tokens: 200
    };

    this.http.post('https://api.together.xyz/v1/chat/completions', body, { headers })
      .subscribe((response: any) => {
        this.botResponse = response.choices[0].message.content.trim();
      }, (error) => {
        console.error('Erreur API', error);
        this.botResponse = 'Erreur de communication avec Together.ai.';
      });
  }
}