import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';

/**
 * Authentication Layout
 * 
 * Used for:
 * - Login page
 * - Registration page
 * - Password reset
 * - Email verification
 * - Account activation
 * 
 * Shell Structure:
 * - Minimal header (logo only)
 * - Centered content area
 * - Optional sidebar with benefits/features
 * 
 * Best Practices:
 * - Clean, minimal design for focus
 * - Center form on page
 * - No main navigation (minimal distractions)
 * - Optional background image/gradient
 * - Responsive single-column on mobile
 * - Security-focused (no sensitive info in URLs)
 * - Alternative auth methods (Google, Microsoft, etc.)
 */
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, AuthHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {}
