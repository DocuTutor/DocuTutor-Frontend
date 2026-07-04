/**
 * Chat API Interfaces
 * These interfaces match the backend DTOs for type safety
 */

/**
 * Request payload for the chat API
 * Matches backend ChatRequestDto
 */
export interface ChatRequest {
  documentId: string;
  question: string;
}

/**
 * Response payload from the chat API
 * Matches backend AnswerResultDto
 */
export interface ChatResponse {
  answer: string;
}

/**
 * Chat message model for displaying in the UI
 */
export interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
  isLoading?: boolean;
}

/**
 * Error response structure from the backend
 */
export interface ChatErrorResponse {
  message: string;
  error: string;
  type: string;
}
