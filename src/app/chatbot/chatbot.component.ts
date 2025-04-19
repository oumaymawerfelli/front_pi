import { Component, Input } from '@angular/core';
import { ChatbotService } from '../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @Input() visible = true;
  userInput = '';
  messages: { role: string, content: string }[] = [];

  constructor(private chatbotService: ChatbotService) {}

  handleSend() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ role: 'user', content: userMessage });
    this.userInput = '';

    this.chatbotService.sendMessage(userMessage).subscribe({
      next: (res) => {
        try {
          const json = typeof res === 'string' ? JSON.parse(res) : res;
          const reply = json.choices[0].message.content;
          this.messages.push({ role: 'assistant', content: reply });
        } catch (e) {
          this.messages.push({ role: 'assistant', content: "Erreur lors de l’analyse de la réponse." });
        }
      },
      error: () => {
        this.messages.push({ role: 'assistant', content: "❌ Une erreur s'est produite." });
      }
    });
  }

  close() {
    this.visible = false;
  }
}
