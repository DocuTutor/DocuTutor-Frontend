# Chat Component - Quick Start Guide

## 🚀 5-Minute Integration

### Step 1: Configure API URL
Edit `src/app/features/documents/constants/api.constants.ts`:

```typescript
export const API_BASE_URL = 'http://your-backend-url.com/api';
```

### Step 2: Import Component
In your page/component TypeScript file:

```typescript
import { ChatComponent } from './features/documents/components/chat/chat.component';

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [ChatComponent], // ← Add here
  // ...
})
```

### Step 3: Add to Template
In your HTML file:

```html
<app-chat [documentId]="yourDocumentId"></app-chat>
```

### Step 4: Provide Document ID
In your component:

```typescript
export class YourPageComponent {
  yourDocumentId = '123e4567-e89b-12d3-a456-426614174000'; // UUID
}
```

## ✅ That's it! Your chat is ready to use.

---

## 📋 Common Integration Patterns

### Pattern 1: With Route Parameter
```typescript
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';

export class DocumentPage {
  documentId = signal<string | null>(null);

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.documentId.set(params.get('id'));
    });
  }
}
```

```html
@if (documentId()) {
  <app-chat [documentId]="documentId()!"></app-chat>
}
```

### Pattern 2: Side Panel
```html
<div class="layout">
  <main class="content">
    <!-- Your main content -->
  </main>
  
  <aside class="sidebar">
    <app-chat [documentId]="currentDocId"></app-chat>
  </aside>
</div>
```

```css
.layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}
```

### Pattern 3: Modal/Dialog
```typescript
openChatDialog(documentId: string) {
  // Show dialog with chat component
}
```

```html
<dialog>
  <app-chat [documentId]="selectedDocId"></app-chat>
</dialog>
```

---

## 🎨 Customization

### Change Colors
```css
app-chat {
  --primary-color: #your-color;
  --text-primary: #your-text-color;
}
```

### Adjust Height
```css
app-chat {
  height: 600px; /* or any height */
  display: block;
}
```

---

## 🔧 Environment Configuration

### Development
```typescript
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Production
```typescript
export const API_BASE_URL = 'https://api.yourdomain.com/api';
```

### Using Angular Environments
```typescript
// api.constants.ts
import { environment } from '../../../environments/environment';
export const API_BASE_URL = environment.apiUrl;

// environment.ts
export const environment = {
  apiUrl: 'http://localhost:5000/api'
};
```

---

## ❓ Troubleshooting

### Problem: "No document selected" message
**Fix:** Ensure you're passing a valid documentId:
```html
<app-chat [documentId]="yourDocumentId"></app-chat>
```

### Problem: CORS errors
**Fix:** Configure CORS in your backend to allow your frontend origin.

### Problem: 401 Unauthorized
**Fix:** Verify user is logged in and auth interceptor is configured.

### Problem: Styles not applying
**Fix:** Check if global CSS variables are defined or add them to your theme.

---

## 📚 Full Documentation

For detailed information, see:
- **Integration Guide:** `CHAT_INTEGRATION_GUIDE.md`
- **Component Docs:** `src/app/features/documents/components/chat/README.md`
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`

---

## 💡 Tips

1. **Testing:** Use a known document ID from your database
2. **Styling:** Use CSS variables for consistent theming
3. **Loading:** Component handles loading states automatically
4. **Errors:** Error messages are user-friendly by default
5. **History:** Users can clear history with the Clear button
6. **Shortcuts:** Ctrl+Enter to send messages quickly

---

## 🎯 Example: Complete Integration

```typescript
// document-viewer.page.ts
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [ChatComponent],
  template: `
    <div class="page">
      <header>
        <h1>{{ documentTitle }}</h1>
      </header>
      
      <main class="content">
        <section class="document-preview">
          <!-- Your document preview here -->
        </section>
        
        <section class="chat-panel">
          @if (documentId()) {
            <app-chat [documentId]="documentId()!"></app-chat>
          }
        </section>
      </main>
    </div>
  `,
  styles: [`
    .content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      padding: 2rem;
    }
    
    .chat-panel {
      height: 80vh;
      overflow: hidden;
    }
  `]
})
export class DocumentViewerPage {
  documentId = signal<string | null>(null);
  documentTitle = 'My Document';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.documentId.set(params.get('id'));
    });
  }
}
```

---

## ✨ That's all you need to know to get started!

For advanced features, error handling, and best practices, check the full documentation.
