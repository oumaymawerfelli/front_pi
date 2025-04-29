import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private generativeAi: GoogleGenerativeAI;
  private chatHistory: Array<{
    role: 'user' | 'model';
    parts: { text: string }[];
  }> = [
    {
      role: 'user',
      parts: [{
        text: "You are a Green AI Assistant specializing in agriculture, bio products, and environmental practices. Your responses should focus on these topics and provide helpful, accurate information."
      }]
    },
    {
      role: 'model',
      parts: [{
        text: "Understood! I'm ready to assist with questions about sustainable agriculture, eco-friendly products, and environmental best practices. How can I help you today?"
      }]
    }
  ];

  constructor() {
    this.generativeAi = new GoogleGenerativeAI('AIzaSyAi_kYIvz87KO4re2aHr5WBD3xGpf-uf2E');
  }

  private addToHistory(role: 'user' | 'model', text: string) {
    this.chatHistory.push({
      role,
      parts: [{ text }],
    });
  }

  async generateText(prompt: string) {
    const model = this.generativeAi.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    };

    this.addToHistory('user', prompt);
    
    const chatSession = model.startChat({
      generationConfig,
      history: this.chatHistory,
    });

    try {
      const result = await chatSession.sendMessage(prompt);
      const response = await result.response.text();
      this.addToHistory('model', response);
      
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
}