# Shared Layer Documentation

## Overview

The Shared layer is a centralized repository for reusable, production-ready components, directives, pipes, validators, types, and animations. This layer follows Angular 21 best practices with a focus on performance, accessibility, and maintainability.

## Architecture Principles

- **Single Responsibility**: Each component/directive/pipe has one clear purpose
- **Presentation Only**: Components are purely presentational with no business logic
- **Reusability**: All components are designed to be used across multiple features
- **Performance**: OnPush change detection strategy on all components
- **Accessibility**: WCAG AA compliance with proper ARIA attributes
- **Type Safety**: Strict TypeScript with no `any` types
- **Standalone**: All components are standalone (no NgModules required)
- **Signals-First**: Uses Angular signals for state management

## Directory Structure

```
shared/
├── components/              # Presentation components
│   ├── button/             # Button component with variants
│   ├── card/               # Card container component
│   ├── badge/              # Status badge component
│   ├── alert/              # Alert notification component
│   ├── modal/              # Modal dialog component
│   ├── spinner/            # Loading spinner component
│   ├── input/              # Form input component
│   ├── dropdown/           # Select dropdown component
│   ├── tabs/               # Tab navigation component
│   └── index.ts            # Components barrel export
├── directives/             # Custom directives
│   ├── click-outside.directive.ts      # Click outside detection
│   ├── ripple.directive.ts             # Ripple effect
│   ├── debounce-click.directive.ts     # Click debouncing
│   └── index.ts                        # Directives barrel export
├── pipes/                  # Custom pipes
│   ├── safe-html.pipe.ts       # Safe HTML rendering
│   ├── trim.pipe.ts            # String trimming
│   ├── truncate.pipe.ts        # String truncation
│   ├── safe-url.pipe.ts        # URL validation
│   └── index.ts                # Pipes barrel export
├── validators/             # Form validators
│   ├── validators.ts       # Validator functions
│   └── index.ts            # Validators barrel export
├── interfaces/             # TypeScript interfaces
│   └── index.ts            # Common interfaces
├── types/                  # TypeScript type definitions
│   └── index.ts            # Common type definitions
├── animations/             # Animation definitions
│   └── index.ts            # Animation triggers
├── icons/                  # Icon components
│   ├── icons.ts            # Icon component definitions
│   ├── icon.html           # Icon base template
│   ├── icon.css            # Icon styling
│   └── index.ts            # Icons barrel export
└── index.ts                # Main shared layer barrel export
```

## Components

### Button Component
Reusable button with multiple variants, sizes, and states.

**Features:**
- Variants: primary, secondary, danger, ghost
- Sizes: sm, md, lg
- States: disabled, loading
- Full accessibility support

**Usage:**
```typescript
import { ButtonComponent } from '@shared';

@Component({
  imports: [ButtonComponent],
  template: `
    <app-button
      variant="primary"
      size="md"
      (onClick)="handleClick()">
      Click me
    </app-button>
  `
})
export class MyComponent {}
```

### Card Component
Simple container for grouping related content.

**Features:**
- Clean, minimal design
- Responsive padding
- Subtle shadow effects

**Usage:**
```html
<app-card>
  <h2>Card Title</h2>
  <p>Card content</p>
</app-card>
```

### Badge Component
Small component for status indicators or labels.

**Features:**
- Variants: primary, success, warning, danger, info
- Sizes: sm, md, lg
- Non-intrusive design

**Usage:**
```html
<app-badge variant="success" size="md">Active</app-badge>
```

### Alert Component
Display important messages with different severity levels.

**Features:**
- Severity: success, warning, error, info
- Dismissible alerts with close button
- ARIA attributes for accessibility

**Usage:**
```typescript
<app-alert
  severity="error"
  [isDismissible]="true"
  (onClose)="handleClose()">
  An error occurred
</app-alert>
```

### Modal Component
Dialog overlay for user confirmations or additional information.

**Features:**
- Customizable title
- Dismissible via backdrop click or close button
- Proper focus management
- ARIA dialog attributes

**Usage:**
```typescript
<app-modal
  [isOpen]="isModalOpen()"
  title="Confirm Action"
  (onClose)="closeModal()">
  Are you sure?
</app-modal>
```

### Spinner Component
Loading indicator for async operations.

**Features:**
- Sizes: sm, md, lg
- Smooth animation
- Accessibility labels

**Usage:**
```html
<app-spinner size="md" ariaLabel="Loading content"></app-spinner>
```

### Input Component
Form input field with validation support.

**Features:**
- Support for multiple input types
- Error state with messages
- Label support
- Proper accessibility

**Usage:**
```typescript
<app-input
  type="email"
  label="Email"
  placeholder="Enter email"
  [hasError]="isInvalid()"
  errorMessage="Invalid email"
  (onChange)="updateValue($event)">
</app-input>
```

### Dropdown Component
Select dropdown with multiple options.

**Features:**
- Customizable options
- Selected value tracking
- Label support
- Disabled state

**Usage:**
```typescript
<app-dropdown
  label="Select Option"
  [options]="options()"
  [selectedValue]="selected()"
  (onChange)="onSelectChange($event)">
</app-dropdown>
```

### Tabs Component
Tabbed interface for organizing content.

**Features:**
- Multiple tabs support
- Keyboard navigation (arrow keys)
- ARIA attributes
- Tab change events

**Usage:**
```typescript
<app-tabs
  [tabs]="tabItems()"
  [selectedTabId]="activeTab()"
  (onTabChange)="selectTab($event)">
  <ng-container *ngFor="let tab of tabItems()">
    <div [attr.data-tab]="tab.id">{{ tab.content }}</div>
  </ng-container>
</app-tabs>
```

## Directives

### ClickOutside Directive
Detects and emits events when clicking outside an element.

**Usage:**
```html
<div appClickOutside (clickOutside)="closeDropdown()">
  <button>Toggle</button>
  <div *ngIf="isOpen">Dropdown</div>
</div>
```

### Ripple Directive
Adds a material-like ripple effect on click.

**Usage:**
```html
<button appRipple>Ripple Button</button>
```

### DebounceClick Directive
Prevents rapid successive clicks.

**Usage:**
```html
<button appDebounceClick [debounceTime]="500" (click)="onSubmit()">
  Submit
</button>
```

## Pipes

### SafeHtml Pipe
Renders HTML content safely (use with trusted content only).

**Usage:**
```html
<div [innerHTML]="htmlContent | appSafeHtml"></div>
```

### Trim Pipe
Trims whitespace from strings.

**Usage:**
```html
<p>{{ '  hello  ' | appTrim }}</p>
```

### Truncate Pipe
Truncates text with configurable length.

**Usage:**
```html
<p>{{ longText | appTruncate:20:'...' }}</p>
```

### Safe URL Pipe
Validates and sanitizes URLs.

**Usage:**
```html
<img [src]="imageUrl | appSafeUrl" alt="Image" />
```

## Validators

### Email Validator
Validates email format.

```typescript
import { emailValidator } from '@shared';

email: new FormControl('', [emailValidator()])
```

### Min Length Validator
Validates minimum string length.

```typescript
password: new FormControl('', [minLengthValidator(8)])
```

### Match Fields Validator
Validates that two fields match (e.g., password confirmation).

```typescript
import { matchFieldsValidator } from '@shared';

const group = new FormGroup({
  password: new FormControl(''),
  confirmPassword: new FormControl('')
}, { validators: [matchFieldsValidator('password', 'confirmPassword')] })
```

### URL Validator
Validates URL format.

```typescript
website: new FormControl('', [urlValidator()])
```

### Pattern Validator
Validates against a regex pattern.

```typescript
phone: new FormControl('', [patternValidator(/^\d{10}$/)])
```

### Required Validator
Custom required validator.

```typescript
name: new FormControl('', [requiredValidator()])
```

## Interfaces

### IPaginationResult<T>
Represents a paginated API response.

```typescript
interface IPaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

### IEntity
Base interface for domain entities.

```typescript
interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### IApiResponse<T>
Standard API response wrapper.

```typescript
interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### ISelectOption
Dropdown option structure.

```typescript
interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
```

## Types

### Nullable<T>
Allows null or undefined.

```typescript
type Nullable<T> = T | null | undefined;
```

### Result<T, E>
Result type for success or failure.

```typescript
type Result<T, E = string> = 
  | { success: true; value: T } 
  | { success: false; error: E };
```

### HttpMethod
HTTP method types.

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
```

### SortDirection
Sort direction for queries.

```typescript
type SortDirection = 'asc' | 'desc';
```

### PaginationOptions
Pagination configuration.

```typescript
type PaginationOptions = {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: SortDirection;
};
```

### ThemeVariant
Application theme.

```typescript
type ThemeVariant = 'light' | 'dark';
```

### NotificationType
Notification severity.

```typescript
type NotificationType = 'success' | 'error' | 'warning' | 'info';
```

## Animations

### fadeInAnimation
Fade in/out effect.

```typescript
@Component({
  animations: [fadeInAnimation]
})
class MyComponent {}

// Template
<div [@fadeIn]>Content</div>
```

### slideInAnimation
Slide in/out from left.

```html
<div [@slideIn]>Sliding content</div>
```

### scaleInAnimation
Scale up/down from center.

```html
<div [@scaleIn]>Scaling content</div>
```

### bounceAnimation
Bounce on entry.

```html
<div [@bounce]>Bouncing content</div>
```

### rotateInAnimation
Rotate into view.

```html
<div [@rotateIn]>Rotating content</div>
```

### pulseAnimation
Continuous pulse effect.

```html
<div [@pulse]>Pulsing content</div>
```

### shakeAnimation
Shake effect on entry.

```html
<div [@shake]>Shaking content</div>
```

## Icons

Icon components for common actions and states.

### Available Icons
- IconComponent: Base icon component
- IconSuccessComponent: Checkmark icon
- IconErrorComponent: Error/X icon
- IconWarningComponent: Warning triangle
- IconInfoComponent: Info circle
- IconChevronDownComponent: Downward chevron
- IconMenuComponent: Hamburger menu
- IconCloseComponent: Close/X icon

**Usage:**
```typescript
import { IconSuccessComponent } from '@shared';

@Component({
  imports: [IconSuccessComponent],
  template: `<app-icon-success size="md"></app-icon-success>`
})
```

## Best Practices

1. **Import from Barrel Files**: Always import from the barrel exports (`@shared`)
2. **Use Inputs/Outputs**: Components use `input()` and `output()` functions
3. **OnPush Strategy**: All components have `changeDetection: ChangeDetectionStrategy.OnPush`
4. **No Business Logic**: Components are purely presentational
5. **Type Safe**: Use proper TypeScript interfaces and types
6. **Accessibility**: All components have proper ARIA attributes
7. **Responsive**: Components work on all screen sizes
8. **Performance**: Signals-first state management

## Import Examples

### Import Everything
```typescript
import { 
  ButtonComponent, 
  CardComponent, 
  emailValidator,
  fadeInAnimation 
} from '@shared';
```

### Import Specific Exports
```typescript
import { ButtonComponent } from '@shared/components';
import { emailValidator } from '@shared/validators';
import { fadeInAnimation } from '@shared/animations';
```

## Configuration

### Path Alias (tsconfig.json)
```json
{
  "compilerOptions": {
    "paths": {
      "@shared": ["src/app/shared/index.ts"],
      "@shared/*": ["src/app/shared/*"]
    }
  }
}
```

## Contributing

When adding new shared components/directives/pipes:

1. Create in appropriate subdirectory
2. Make it standalone
3. Use OnPush change detection
4. Add comprehensive JSDoc comments
5. Create barrel export file
6. Update parent index.ts
7. Add accessibility attributes
8. No business logic
9. Fully type-safe
10. Include examples in documentation

## Performance Considerations

- All components use OnPush change detection
- Signals are preferred over BehaviorSubject
- Computed values for derived state
- Proper cleanup in directives
- Lazy load feature modules

## Accessibility Compliance

- WCAG AA minimum compliance
- Proper ARIA attributes
- Focus management
- Keyboard navigation
- Color contrast ratios
- Semantic HTML

## Testing

Components are designed to be easily testable:
- Clear inputs and outputs
- No external dependencies
- Predictable behavior
- Proper TypeScript typing

## Version Information

- Angular: 21
- TypeScript: Latest with strict mode
- Styling: CSS (compatible with Tailwind v4)
- Change Detection: OnPush strategy

## Support

For issues, improvements, or new components, refer to the component guidelines above.
