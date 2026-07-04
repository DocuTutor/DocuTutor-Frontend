import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/chat.interface';

/**
 * Chat Component
 * Provides a chat interface for asking questions about documents
 */
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  /**
   * Document ID to query (required input)
   */
  @Input() documentId?: string;

  /**
   * Current question being typed
   */
  question = signal('');

  /**
   * Chat history containing all question-answer pairs
   */
  chatHistory = signal<ChatMessage[]>([]);

  /**
   * Loading state for API requests
   */
  isLoading = signal(false);

  /**
   * Error message to display
   */
  errorMessage = signal<string | null>(null);

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    if (!this.documentId) {
      this.errorMessage.set('No document selected. Please select a document to start asking questions.');
    }
  }

  /**
   * Handle keyboard events for shortcuts
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }
  }

  /**
   * Submit the question to the chat API
   */
  onSubmit(): void {
    const questionText = this.question().trim();

    // Validation
    if (!questionText) {
      this.errorMessage.set('Please enter a question.');
      return;
    }

    if (!this.documentId) {
      this.errorMessage.set('No document selected.');
      return;
    }

    // Clear error and set loading state
    this.errorMessage.set(null);
    this.isLoading.set(true);

    // Create a temporary message with loading state
    const tempMessage: ChatMessage = {
      id: Date.now().toString(),
      question: questionText,
      answer: '',
      timestamp: new Date(),
      isLoading: true
    };

    // Add to history
    this.chatHistory.update(history => [...history, tempMessage]);

    // Clear input
    this.question.set('');

    // Call API
    this.chatService.ask(this.documentId, questionText).subscribe({
      next: (response) => {
        // Update the temporary message with the answer
        this.chatHistory.update(history => 
          history.map(msg => 
            msg.id === tempMessage.id 
              ? { ...msg, answer: response.answer, isLoading: false }
              : msg
          )
        );
        this.isLoading.set(false);
      },
      error: (error) => {
        // Remove the temporary message on error
        this.chatHistory.update(history => 
          history.filter(msg => msg.id !== tempMessage.id)
        );
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Clear the chat history
   */
  clearHistory(): void {
    this.chatHistory.set([]);
    this.errorMessage.set(null);
  }

  /**
   * Check if submit button should be disabled
   */
  isSubmitDisabled(): boolean {
    return this.isLoading() || !this.question().trim() || !this.documentId;
  }
}
