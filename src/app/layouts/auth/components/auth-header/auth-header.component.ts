import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LogoComponent } from '../../../../shared/components/logo-component/logo-component';
import { LanguageSwitcherComponent } from "../../../../shared/components/language-switcher/language-switcher.component";

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
  imports: [LogoComponent, LanguageSwitcherComponent]
})
export class AuthHeaderComponent {}
