# Chat API Integration Guide

## 📋 Overview
This guide explains how the Angular frontend integrates with the `/api/chat/ask` backend endpoint to provide an interactive document Q&A feature.

## 🗂️ File Structure

```
src/app/features/documents/
├── components/
│   └── chat/
│       ├── chat.component.ts          # Main component logic
│       ├── chat.component.html        # Component template
│       ├── chat.component.css         # Component styles
│       └── README.md                  # Component documentation
├── constants/
│   └── api.constants.ts               # API configuration
├── interfaces/
│   └── chat.interface.ts              # TypeScript interfaces
├── services/
│   └── chat.service.ts                # HTTP service for API calls
└── pages/
    └── document-details/
        ├── document-details.page.ts   # Example integration
        ├── document-details.page.html
        └── document-details.page.css
```

## 🚀 Quick Start

### 1. Import the Chat Component

```typescript
import { ChatComponent } from './features/documents/components/chat/chat.component';

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [ChatComponent], // Add here
  template: `
    <app-chat [documentId]="documentId"></app-chat>
  `
})
export class YourPageComponent {
  documentId = '123e4567-e89b-12d3-a456-426614174000';
}
```

### 2. Configure API Base URL

Update `src/app/features/documents/constants/api.constants.ts`:

```typescript
export const API_BASE_URL = 'https://your-api-domain.com/api';
```

For different environments:
- **Development:** `http://localhost:5000/api`
- **Staging:** `https://staging-api.yourdomain.com/api`
- **Production:** `https://api.yourdomain.com/api`

### 3. Ensure Authentication

The chat API requires authentication. Make sure:
- Auth interceptor is configured in `app.config.ts`
- User is logged in
- Access token is included in requests

## 📦 Components

### 1. TypeScript Interfaces (`chat.interface.ts`)

Provides type safety for API communication:

```typescript
export interface ChatRequest {
  documentId: string;  // UUID format
  question: string;
}

export interface ChatResponse {
  answer: string;
}

export interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
  isLoading?: boolean;
}
```

### 2. Chat Service (`chat.service.ts`)

Handles HTTP communication with the backend:

**Features:**
- POST request to `/api/Chat/ask`
- Error handling for 400, 401, 404, 500 errors
- Type-safe Observable responses
- User-friendly error messages

**Usage:**
```typescript
constructor(private chatService: ChatService) {}

this.chatService.ask(documentId, question).subscribe({
  next: (response) => console.log(response.answer),
  error: (error) => console.error(error.message)
});
```

### 3. Chat Component (`chat.component.ts`)

Main UI component with:

**Inputs:**
- `documentId: string` - Required UUID of the document

**Features:**
- Question input with validation
- Chat history display
- Loading states
- Error handling
- Clear history
- Keyboard shortcuts (Ctrl+Enter)

**Signals:**
- `question` - Current question text
- `chatHistory` - Array of messages
- `isLoading` - Loading state
- `errorMessage` - Error display

## 🎨 UI Features

### Question Input
- Multi-line textarea
- Auto-resize
- Disabled state during loading
- Validation (not empty, document exists)
- Keyboard shortcut: `Ctrl + Enter` to send

### Message Display
- Chronological order (oldest to newest)
- Visual distinction between questions and answers
- Timestamps on each message
- Loading animation while waiting for response
- Icons for user and AI assistant

### Error Handling
- Prominent error message display
- Network error detection
- Server error parsing
- Validation error feedback
- Auto-clear on next submission

### Responsive Design
- Desktop: Side-by-side layout
- Tablet: Adjusted spacing
- Mobile: Stacked layout
- Flexible height management

## 🔧 Configuration

### API Endpoints

Located in `constants/api.constants.ts`:

```typescript
export const API_ENDPOINTS = {
  CHAT: {
    ASK: `${API_BASE_URL}/Chat/ask`
  },
  AUTH: {
    LOGIN: `${API_BASE_URL}/Auth/login`,
    REGISTER: `${API_BASE_URL}/Auth/register`,
    REFRESH: `${API_BASE_URL}/Auth/refresh-token`
  },
  DOCUMENTS: {
    BASE: `${API_BASE_URL}/Document`
  }
};
```

### Environment Variables

For multiple environments, create environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api'
};
```

Then update `api.constants.ts`:
```typescript
import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiUrl;
```

## 🔐 Authentication

The chat service works with your existing auth setup:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]) // Adds auth token
    )
  ]
};
```

The `authInterceptor` automatically:
- Adds Authorization header with Bearer token
- Handles 401 responses
- Refreshes tokens when needed

## 📱 Integration Examples

### Example 1: Document Details Page

```typescript
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
  selector: 'app-document-details',
  standalone: true,
  imports: [ChatComponent],
  template: `
    <div class="page-container">
      <h1>{{ documentName() }}</h1>
      
      @if (documentId()) {
        <app-chat [documentId]="documentId()!"></app-chat>
      }
    </div>
  `
})
export class DocumentDetailsPage implements OnInit {
  documentId = signal<string | null>(null);
  documentName = signal<string>('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.documentId.set(params.get('id'));
    });
  }
}
```

### Example 2: Modal/Dialog Integration

```typescript
import { Component } from '@angular/core';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  imports: [ChatComponent],
  template: `
    <div class="dialog-overlay">
      <div class="dialog-content">
        <button (click)="close()" class="close-btn">×</button>
        <app-chat [documentId]="documentId"></app-chat>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog-content {
      width: 90%;
      max-width: 800px;
      height: 80vh;
      background: white;
      border-radius: 1rem;
      position: relative;
    }
  `]
})
export class ChatDialogComponent {
  @Input() documentId!: string;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
```

### Example 3: Side Panel Integration

```typescript
@Component({
  template: `
    <div class="layout">
      <div class="document-viewer">
        <!-- PDF viewer or document content -->
      </div>
      
      <aside class="chat-panel">
        <app-chat [documentId]="currentDocumentId"></app-chat>
      </aside>
    </div>
  `,
  styles: [`
    .layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
      height: 100vh;
    }
    .chat-panel {
      overflow: hidden;
    }
  `]
})
export class DocumentViewerPage {}
```

## 🧪 Testing

### Unit Test Example

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatComponent } from './chat.component';
import { ChatService } from '../../services/chat.service';
import { of, throwError } from 'rxjs';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ChatService', ['ask']);

    await TestBed.configureTestingModule({
      imports: [ChatComponent, HttpClientTestingModule],
      providers: [{ provide: ChatService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    chatService = TestBed.inject(ChatService) as jasmine.SpyObj<ChatService>;
  });

  it('should submit question and display answer', (done) => {
    component.documentId = 'test-doc-id';
    component.question.set('What is this document about?');
    
    const mockResponse = { answer: 'This document is about...' };
    chatService.ask.and.returnValue(of(mockResponse));

    component.onSubmit();

    setTimeout(() => {
      expect(chatService.ask).toHaveBeenCalledWith(
        'test-doc-id',
        'What is this document about?'
      );
      expect(component.chatHistory().length).toBe(1);
      expect(component.chatHistory()[0].answer).toBe(mockResponse.answer);
      done();
    }, 100);
  });

  it('should handle API errors', (done) => {
    component.documentId = 'test-doc-id';
    component.question.set('Test question');
    
    chatService.ask.and.returnValue(
      throwError(() => new Error('Server error'))
    );

    component.onSubmit();

    setTimeout(() => {
      expect(component.errorMessage()).toBeTruthy();
      expect(component.chatHistory().length).toBe(0);
      done();
    }, 100);
  });
});
```

## 🐛 Troubleshooting

### Problem: CORS Errors
**Solution:** Configure CORS in your backend:

```csharp
// Program.cs or Startup.cs
services.AddCors(options => {
    options.AddPolicy("AllowAngular", builder => {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

app.UseCors("AllowAngular");
```

### Problem: 401 Unauthorized
**Solution:** 
1. Check if user is logged in
2. Verify auth interceptor is working
3. Check token expiration
4. Test with Postman/curl to verify backend

### Problem: Styles not applying
**Solution:**
1. Ensure global CSS variables are defined
2. Check ViewEncapsulation settings
3. Verify component imports

### Problem: Component not updating
**Solution:**
1. Use Angular signals (already implemented)
2. Check change detection strategy
3. Verify Observable subscriptions

## 🔄 API Request Flow

```
User Types Question
      ↓
Clicks Send Button / Presses Ctrl+Enter
      ↓
Component validates input
      ↓
Creates ChatRequest object
      ↓
Calls ChatService.ask()
      ↓
Service makes HTTP POST to /api/Chat/ask
      ↓
Backend processes request
      ↓
Returns ChatResponse
      ↓
Service handles response/error
      ↓
Component updates UI
      ↓
Displays answer in chat history
```

## 📊 Performance Considerations

1. **Lazy Loading:** Load chat component only when needed
2. **Debouncing:** Add debounce to prevent rapid submissions
3. **Caching:** Consider caching common questions/answers
4. **Pagination:** Limit chat history display for long conversations
5. **Virtual Scrolling:** For very long chat histories

## 🎯 Next Steps

1. ✅ Basic integration complete
2. 🔄 Add message persistence (localStorage)
3. 🔄 Implement export chat feature
4. 🔄 Add rich text formatting
5. 🔄 Support file attachments in questions
6. 🔄 Add voice input capability
7. 🔄 Implement feedback mechanism

## 📚 Additional Resources

- [Angular Signals Documentation](https://angular.io/guide/signals)
- [Angular HTTP Client](https://angular.io/guide/http)
- [RxJS Observables](https://rxjs.dev/guide/overview)
- [Angular Forms](https://angular.io/guide/forms-overview)

## 💬 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend API documentation
3. Test with browser DevTools Network tab
4. Check backend logs for errors
