import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SubscriptionService } from '../../../subscription/services/subscription.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
type SettingsTab = 'profile' | 'billing' | 'preferences' | 'notifications';
@Component({
  selector: 'app-settings-component',
  imports: [DatePipe,TranslatePipe],
  templateUrl: './settings-component.html',
})
export class SettingsComponent implements OnInit {


  private readonly subscriptionService = inject(SubscriptionService);
  private readonly authService = inject(AuthService);

  readonly subscription = this.subscriptionService.currentSubscription;

  private readonly user = this.authService.getUser();

  readonly userName: string = this.user?.name?.trim() || 'User';
  readonly userEmail: string = this.decodeEmailFromToken(this.authService.getAccessToken());
  readonly userInitials: string = this.computeInitials(this.userName);

  readonly firstName: string = this.extractFirstName(this.userName);
  readonly lastName: string = this.extractLastName(this.userName);

    tab = signal<SettingsTab>('profile');

  sections: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'preferences', label: 'Preferences', icon: '🎛' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ];

  difficulties = ['Easy', 'Medium', 'Hard'];

  prefs = [
    { label: 'Show page citations by default', on: true },
    { label: 'Auto-generate summary after upload', on: true },
    { label: 'Compact chat density', on: false },
  ];

  notifs = [
    { label: 'Document ready for study', on: true },
    { label: 'Weekly progress digest', on: true },
    { label: 'Quiz reminders', on: false },
    { label: 'Marketing emails', on: false },
  ];

  ngOnInit(): void {
    this.subscriptionService.loadMySubscription().subscribe();
  }

  upgradeToPro(): void {
    this.subscriptionService.createCheckoutSession('Pro').subscribe((res) => {
      if (res.isSuccess) {
        window.location.href = res.data.checkoutUrl;
      }
    });
  }

  manageBilling(): void {
    this.subscriptionService.createPortalSession().subscribe((res) => {
      if (res.isSuccess) {
        window.location.href = res.data.portalUrl;
      }
    });
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

  private extractFirstName(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return parts[0] ?? '';
  }

  private extractLastName(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }
}
