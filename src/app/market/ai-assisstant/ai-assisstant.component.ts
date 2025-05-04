import { Component, ElementRef, ViewChild } from '@angular/core';
import { GeminiService } from '../gimini.service';

@Component({
  selector: 'app-ai-assisstant',
  templateUrl: './ai-assisstant.component.html',
  styleUrls: ['./ai-assisstant.component.css']
})
export class AiAssisstantComponent {
  isChatOpen: boolean = false;
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  prompt = '';
  isProcessing = false;
  errorMessage = '';
  chatMessages: {
    text: string;
    isUser: boolean;
    timestamp?: string;
  }[] = [];

  constructor(private geminiService: GeminiService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  async generate() {
    if (!this.prompt.trim()) {
      this.errorMessage = 'Please enter a message';
      return;
    }
    
    await this.sendTextPrompt(this.prompt);
  }

  private async sendTextPrompt(promptText: string) {
    this.chatMessages.push({
      text: promptText,
      isUser: true,
      timestamp: this.getCurrentTime(),
    });

    this.isProcessing = true;
    this.errorMessage = '';
    this.prompt = '';

    try {
      const greenAssistantPrompt = `
You are a Green AI Assistant for a platform connecting students, farmers, and customers.
Your role is to assist with topics related to agriculture, bio products, environmental practices, and educational content.

Guidelines:
1. Provide accurate and supportive information about bio products, farming tips, eco-friendly practices, and agricultural education.
2. Offer practical advice, simple explanations, and examples when applicable.
3. Encourage sustainable farming, responsible consumption, and environmental awareness.
4. Format any lists or structured content clearly and cleanly for easy reading.
5. Politely decline to answer questions unrelated to agriculture, environment, bio products, or education.

Current query: ${promptText}
`;

      const result = await this.geminiService.generateText(greenAssistantPrompt);
      let responseText = result;

      this.chatMessages.push({
        text: responseText,
        isUser: false,
        timestamp: this.getCurrentTime(),
      });
    } catch (error) {
      console.error('Error generating response:', error);
      this.chatMessages.push({
        text: 'Sorry, I encountered an error. Please try again later.',
        isUser: false,
        timestamp: this.getCurrentTime(),
      });
    } finally {
      this.isProcessing = false;
    }
  }
}