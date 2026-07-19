import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { LogoComponent } from "../../../../shared/components/logo-component/logo-component";
import { ThemeToggleComponent } from "../../../../shared/components/theme-toggle/theme-toggle";
import { LanguageSwitcherComponent } from "../../../../shared/components/language-switcher/language-switcher.component";
import { TranslatePipe } from '@ngx-translate/core';
import { DashboardMobileDrawerComponent } from '../dashboard-mobile-drawer/dashboard-mobile-drawer.component';
import { AuthService } from '../../../../core/services/auth.service';
import { DocumentService } from '../../../../features/documents/services/document.service';
import { SubscriptionService } from '../../../../features/subscription/services/subscription.service';
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

  planName: string = 'Free';
  usedDocs: number = 0;
  totalDocs: number | string = 5;
  usagePercent: number = 0;
  isFreePlan: boolean = true;

  private readonly subscriptionService = inject(SubscriptionService);
  private readonly documentService = inject(DocumentService);

  constructor() {
    effect(() => {
      const sub = this.subscriptionService.currentSubscription();
      this.planName = sub?.plan ?? 'Free';
      this.isFreePlan = this.planName === 'Free';

      if (this.isFreePlan) {
        this.totalDocs = 5;
      } else {
        this.totalDocs = 'Unlimited';
      }

      this.updateUsagePercent();
    });

    this.documentService.getUserDocuments().subscribe((docs) => {
      this.usedDocs = Array.isArray(docs) ? docs.length : 0;
      this.updateUsagePercent();
    });
  }

  private updateUsagePercent(): void {
    if (this.isFreePlan) {
      this.usagePercent = Math.min(100, Math.round((this.usedDocs / 5) * 100));
      return;
    }

    this.usagePercent = Math.min(100, Math.round((this.usedDocs / 100) * 100));
  }

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
