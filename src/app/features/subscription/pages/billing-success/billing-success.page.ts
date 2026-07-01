import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-billing-success-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <span class="grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
        <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <h1 class="font-display text-3xl font-bold text-foreground">Payment successful</h1>
      <p class="text-muted-foreground">
        Thanks! Your subscription is being activated. It can take a few seconds for your new plan to
        show up once Stripe confirms the payment.
      </p>
      @if (subscription(); as sub) {
        <p class="text-sm font-semibold text-foreground">Current plan: {{ sub.plan }}</p>
      }
      <a routerLink="/dashboard" class="mt-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
        Go to dashboard
      </a>
    </div>
  `,
})
export class BillingSuccessPage implements OnInit {
  private readonly subscriptionService = inject(SubscriptionService);

  readonly subscription = this.subscriptionService.currentSubscription;

  ngOnInit(): void {
    this.subscriptionService.loadMySubscription().subscribe();
  }
}
