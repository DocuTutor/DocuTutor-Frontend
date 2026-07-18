import { Component, input, inject, signal } from '@angular/core';
import { suggestedPrompts } from '../../models/workspace.mock';
import { WorkspaceDocument, ChatMessage } from '../../models/workspace.models';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-panel',
  imports: [FormsModule],
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent {
  private chatService = inject(ChatService);

  readonly doc = input.required<WorkspaceDocument>();
  readonly messages = signal<ChatMessage[]>([]);
  readonly thinking = signal(false);

  inputValue = '';
  readonly prompts = suggestedPrompts;

  render(content: string): string {
    return content.split('\n\n').map((p, i) => `<p class="${i > 0 ? 'mt-3' : ''}">${p.replace(/\*\*(.+?)\*\*/g, '<strong>\$1</strong>')}</p>`).join('');
  }

  onEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.send(this.inputValue);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.send(this.inputValue);
  }

  send(text: string): void {
    if (!text.trim()) {
      return;
    }

    const documentId = this.doc().id;
    if (!documentId) {
      this.messages.update((messages) => [
        ...messages,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'No document is selected yet. Please open a document before asking questions.',
        },
      ]);
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    };

    this.messages.update((messages) => [...messages, userMessage]);
    this.inputValue = '';
    this.thinking.set(true);

    this.chatService.ask(documentId, text).subscribe({
      next: (response) => {
        this.messages.update((messages) => [
          ...messages,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: response.content,
            citations: response.citations,
          },
        ]);
        this.thinking.set(false);
      },
      error: (error) => {
        console.error('Chat error:', error);
        this.messages.update((messages) => [
          ...messages,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Sorry, I encountered an error while processing your request. Please try again.',
          },
        ]);
        this.thinking.set(false);
      },
    });
  }
}

