import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { LogoComponent } from "../../../../shared/components/logo-component/logo-component";
import { ThemeToggleComponent } from "../../../../shared/components/theme-toggle/theme-toggle";
import { LanguageSwitcherComponent } from "../../../../shared/components/language-switcher/language-switcher.component";
import { TranslatePipe } from '@ngx-translate/core';
import { DashboardMobileDrawerComponent } from '../dashboard-mobile-drawer/dashboard-mobile-drawer.component';
import { AuthService } from '../../../../core/services/auth.service';
export interface NavItem {
  to: string;
  label: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, ThemeToggleComponent, LanguageSwitcherComponent,DashboardMobileDrawerComponent,TranslatePipe],
})
export class DashboardSidebarComponent {
  private readonly authService = inject(AuthService);

  readonly nav: NavItem[] = [
    { to: '/dashboard', label: 'nav.dashboard', icon: '🏠', exact: true },
    { to: '/dashboard/upload', label: 'nav.upload', icon: '📤' },
    { to: '/dashboard/documents/neural-networks', label: 'nav.activeDocument', icon: '📖' },
    { to: '/dashboard/settings', label: 'nav.settings', icon: '⚙️' },
  ];

  private readonly user = this.authService.getUser();

  readonly userName: string = this.user?.name?.trim() || 'User';
  readonly userEmail: string = this.decodeEmailFromToken(this.authService.getAccessToken());
  readonly userInitials: string = this.computeInitials(this.userName);

  private computeInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  private decodeEmailFromToken(token: string | null): string {
    if (!token) return '';
    const segments = token.split('.');
    if (segments.length < 2) return '';
    try {
      let payload = segments[1].replace(/-/g, '+').replace(/_/g, '/');
      while (payload.length % 4) payload += '=';
      const claims = JSON.parse(atob(payload)) as Record<string, unknown>;
      const email =
        claims['email'] ??
        claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      return typeof email === 'string' ? email : '';
    } catch {
      return '';
    }
  }
}
