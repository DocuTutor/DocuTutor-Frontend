import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SubscriptionService } from '../../../subscription/services/subscription.service';

@Component({
  selector: 'app-settings-component',
  imports: [DatePipe],
  templateUrl: './settings-component.html',
  styleUrl: './settings-component.css',
})
export class SettingsComponent implements OnInit {

  private readonly subscriptionService = inject(SubscriptionService);
  readonly subscription = this.subscriptionService.currentSubscription;

  tab = signal<"profile" | "billing" | "preferences" | "notifications">("profile");
  sections: { id: "profile" | "billing" | "preferences" | "notifications"; label: string; icon: string }[] = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "preferences", label: "Preferences", icon: "🎛" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
  ];
  fields = [
    { label: "First name", value: "Maya" },
    { label: "Last name", value: "Reyes" },
    { label: "Email", value: "maya@stanford.edu" },
    { label: "University", value: "Stanford University" },
  ];
  difficulties = ["Easy", "Medium", "Hard"];
  prefs = [
    { label: "Show page citations by default", on: true },
    { label: "Auto-generate summary after upload", on: true },
    { label: "Compact chat density", on: false },
  ];
  notifs = [
    { label: "Document ready for study", on: true },
    { label: "Weekly progress digest", on: true },
    { label: "Quiz reminders", on: false },
    { label: "Marketing emails", on: false },
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
}
