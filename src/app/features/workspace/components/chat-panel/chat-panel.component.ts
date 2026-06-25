import { Component, input, OnInit, signal } from '@angular/core';
import { seedChat, suggestedPrompts } from '../../models/workspace.mock';
import { previewLines } from '../../models/workspace.mock';
import { WorkspaceDocument, ChatMessage } from '../../models/workspace.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-panel',
  imports: [FormsModule],
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent  {

   readonly doc = input.required<WorkspaceDocument>();

  readonly messages = signal<ChatMessage[]>(seedChat);
  readonly thinking = signal(false);

  inputValue = '';

  readonly prompts = suggestedPrompts;
  readonly previewLines = previewLines;

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

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    };

    this.messages.update((messages) => [...messages, userMessage]);
    this.inputValue = '';
    this.thinking.set(true);

    setTimeout(() => {
      this.messages.update((messages) => [
        ...messages,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `Great question. Based on **the document**: ${text.trim()} — the relevant material starts around page 14 and is explained in three short paragraphs.\n\nWould you like me to expand on any of the sub-points, or generate a quick quiz on this section?`,
          citations: [
            { page: 14, label: 'p.14' },
            { page: 16, label: 'p.16' },
          ],
        },
      ]);

      this.thinking.set(false);
    }, 1200);
  }
}

