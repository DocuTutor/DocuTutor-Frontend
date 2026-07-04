import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChatRequest, ChatResponse, ChatErrorResponse } from '../interfaces/chat.interface';
import { API_ENDPOINTS } from '../constants/api.constants';

/**
 * Chat Service
 * Handles communication with the Chat API endpoint
 */
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  constructor(private http: HttpClient) {}

  /**
   * Send a question about a document to the chat API
   * @param documentId - UUID of the document to query
   * @param question - User's question about the document
   * @returns Observable<ChatResponse> containing the answer
   */
  ask(documentId: string, question: string): Observable<ChatResponse> {
    const request: ChatRequest = {
      documentId,
      question
    };

    return this.http.post<ChatResponse>(API_ENDPOINTS.CHAT.ASK, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors from the API
   * @param error - HttpErrorResponse from the API
   * @returns Observable that throws a user-friendly error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      // Backend error
      switch (error.status) {
        case 400:
          // Bad request - validation error
          const badRequestError = error.error as ChatErrorResponse;
          errorMessage = badRequestError?.message || 'Invalid request. Please check your input.';
          break;
        case 401:
          // Unauthorized
          errorMessage = 'You are not authorized. Please log in again.';
          break;
        case 404:
          // Not found
          errorMessage = 'Document not found. Please check the document ID.';
          break;
        case 500:
          // Server error
          const serverError = error.error as ChatErrorResponse;
          errorMessage = serverError?.message || 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
