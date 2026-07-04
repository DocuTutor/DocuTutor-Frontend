# Chat Component

## Overview
The Chat Component provides an interactive interface for users to ask questions about documents using the backend AI-powered chat API.

## Features
- ✅ Real-time question and answer interface
- ✅ Chat history display with timestamps
- ✅ Loading states and error handling
- ✅ Keyboard shortcuts (Ctrl+Enter to send)
- ✅ Clear chat history functionality
- ✅ Responsive design for mobile and desktop
- ✅ Type-safe API communication

## Usage

### Basic Integration

```typescript
import { ChatComponent } from './features/documents/components/chat/chat.component';

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [ChatComponent],
  template: `
    <app-chat [documentId]="documentId"></app-chat>
  `
})
export class YourPageComponent {
  documentId = '123e4567-e89b-12d3-a456-426614174000'; // UUID
}
```

### Input Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `documentId` | `string` | Yes | UUID of the document to query |

### Features

#### 1. Ask Questions
Users can type questions in the textarea and submit by:
- Clicking the "Send" button
- Pressing `Ctrl + Enter`

#### 2. Chat History
- All questions and answers are displayed chronologically
- Each message shows timestamp
- Visual distinction between questions (user) and answers (AI)
- Automatic scroll to latest message

#### 3. Loading States
- Submit button shows spinner during API call
- Button is disabled while loading
- Loading indicator in answer placeholder

#### 4. Error Handling
- Network errors
- Validation errors (400)
- Authentication errors (401)
- Server errors (500)
- User-friendly error messages

#### 5. Clear History
- Button to clear all chat messages
- Confirmation before clearing (optional)

## API Integration

### Chat Service
The component uses `ChatService` which communicates with the backend endpoint:

**Endpoint:** `POST /api/Chat/ask`

**Request:**
```json
{
  "documentId": "guid",
  "question": "string"
}
```

**Response:**
```json
{
  "answer": "string"
}
```

### Configuration
API base URL is configured in `constants/api.constants.ts`:

```typescript
export const API_BASE_URL = 'http://127.0.0.1:3658/m1/1212435-1208182-default/api';
```

Update this for different environments (dev/staging/prod).

## Styling

### CSS Variables
The component uses CSS variables for theming:

```css
--surface-color: Background color
--text-primary: Primary text color
--text-secondary: Secondary text color
--primary-color: Primary brand color
--primary-dark: Darker primary shade
--border-color: Border color
--danger-color: Error/danger color
--success-color: Success/answer color
```

### Customization
You can override styles by:

1. **CSS Variables** (Recommended)
```css
:root {
  --primary-color: #your-color;
}
```

2. **Component Styles**
```css
app-chat {
  --primary-color: #your-color;
}
```

## Architecture

### File Structure
```
chat/
├── chat.component.ts       # Component logic
├── chat.component.html     # Template
├── chat.component.css      # Styles
└── README.md              # Documentation
```

### Dependencies
- `ChatService` - API communication
- `ChatMessage` interface - Message model
- `ChatRequest` interface - Request model
- `ChatResponse` interface - Response model

## Testing

### Unit Tests
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { ChatService } from '../../services/chat.service';
import { of, throwError } from 'rxjs';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: jasmine.SpyObj<ChatService>;

  beforeEach(() => {
    const chatServiceSpy = jasmine.createSpyObj('ChatService', ['ask']);
    
    TestBed.configureTestingModule({
      imports: [ChatComponent],
      providers: [
        { provide: ChatService, useValue: chatServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    chatService = TestBed.inject(ChatService) as jasmine.SpyObj<ChatService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit question successfully', () => {
    component.documentId = 'test-id';
    component.question.set('Test question?');
    chatService.ask.and.returnValue(of({ answer: 'Test answer' }));

    component.onSubmit();

    expect(chatService.ask).toHaveBeenCalledWith('test-id', 'Test question?');
    expect(component.chatHistory().length).toBe(1);
  });
});
```

## Troubleshooting

### Issue: Component not receiving documentId
**Solution:** Ensure the parent component passes a valid UUID string to the `[documentId]` input.

### Issue: API requests failing
**Solution:** 
1. Check API_BASE_URL in `constants/api.constants.ts`
2. Verify backend is running
3. Check CORS configuration
4. Verify authentication token

### Issue: Styles not applying
**Solution:**
1. Ensure CSS variables are defined in global styles
2. Check component encapsulation
3. Verify imports in component

## Future Enhancements
- [ ] Message persistence (localStorage)
- [ ] Export chat history
- [ ] Rich text formatting in answers
- [ ] File upload in questions
- [ ] Voice input support
- [ ] Multi-language support
- [ ] Message reactions/feedback
- [ ] Copy answer to clipboard

## Related Files
- `services/chat.service.ts` - API service
- `interfaces/chat.interface.ts` - Type definitions
- `constants/api.constants.ts` - API configuration
