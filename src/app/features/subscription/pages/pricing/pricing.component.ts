import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AppFooterComponent } from '../../../../layouts/app-layout/components/footer/app-footer.component';
import { AppNavbarComponent } from '../../../../layouts/app-layout/components/navbar/app-navbar.component';
import { Router } from '@angular/router';
import { PricingMockService } from '../../services/pricing-mock.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PlanDto, PlanTier } from '../../models/subscription.models';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  imports: [AppNavbarComponent, AppFooterComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly pricingService = inject(PricingMockService);

  readonly plans = signal<PlanDto[]>([]);
  readonly plansLoading = signal(true);
  readonly plansError = signal<string | null>(null);

  // Static marketing comparison table — no backend equivalent.
  readonly matrix = this.pricingService.matrix;

  readonly checkoutLoading = signal<PlanTier | string | null>(null);
  readonly checkoutError = signal<string | null>(null);

  constructor() {
    this.loadPlans();
  }

  loadPlans(): void {
    this.plansLoading.set(true);
    this.plansError.set(null);

    this.subscriptionService.getPlans().subscribe({
      next: (plans) => {
        this.plans.set(plans);
        this.plansLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load plans:', err);
        this.plansLoading.set(false);
        this.plansError.set('pricing.loadError');
      },
    });
  }

  choosePlan(tier: PlanTier | string): void {
    if (tier === 'Free') {
      this.router.navigate(['/dashboard']);
      return;
    }

    if (!this.authService.getAccessToken()) {
      this.router.navigate(['/auth/register'], {
        queryParams: { plan: tier },
      });
      return;
    }

    this.checkoutError.set(null);
    this.checkoutLoading.set(tier);

    this.subscriptionService.createCheckoutSession(tier).subscribe({
      next: (res) => {
        this.checkoutLoading.set(null);

        if (res.isSuccess && res.data?.checkoutUrl) {
          window.location.href = res.data.checkoutUrl;
          return;
        }

        this.checkoutError.set(
          res.message || 'Could not start checkout. Please try again.',
        );
      },
      error: (err) => {
        this.checkoutLoading.set(null);
        console.error('Checkout session error:', err);

        this.checkoutError.set(
          err?.error?.message || 'Could not start checkout. Please try again.',
        );
      },
    });
  }
}
