import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ChatRequest {
  documentId: string;
  question: string;
}

// Backend response format
interface BackendChatResponse {
  answer: string;
  citations?: Array<{
    page: number;
    label: string;
  }>;
}

// Frontend expected format
export interface ChatResponse {
  content: string;
  citations?: Array<{
    page: number;
    label: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = '/api/chat';

  ask(documentId: string, question: string): Observable<ChatResponse> {
    const request: ChatRequest = {
      documentId,
      question
    };
    return this.http.post<BackendChatResponse>(`${this.apiUrl}/ask`, request).pipe(
      map((backendResponse) => ({
        content: backendResponse.answer,
        citations: backendResponse.citations
      }))
    );
  }
}
