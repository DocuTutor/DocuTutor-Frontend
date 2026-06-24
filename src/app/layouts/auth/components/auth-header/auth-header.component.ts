import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Auth Header Component
 * 
 * Recommendations:
 * - Logo/Brand name only
 * - Back to home link (optional)
 * - Simple, minimal design
 * - Dark text or white text depending on background
 */
@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthHeaderComponent {}
