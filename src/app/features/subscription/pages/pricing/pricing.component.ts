import { Component, inject, signal } from '@angular/core';
import { AppFooterComponent } from '../../../../layouts/app-layout/components/footer/app-footer.component';
import { AppNavbarComponent } from '../../../../layouts/app-layout/components/navbar/app-navbar.component';
import { Router, RouterLink } from '@angular/router';
import { PricingMockService } from '../../services/pricing-mock.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PlanTier } from '../../models/subscription.models';
import { SubscriptionService } from '../../services/subscription.service';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  imports: [AppNavbarComponent, AppFooterComponent, RouterLink,TranslatePipe],
})
export class PricingComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly subscriptionService = inject(SubscriptionService);

  readonly checkoutLoading = signal<PlanTier |string| null>(null);
  readonly checkoutError = signal<string | null>(null);

  private readonly pricingService = inject(PricingMockService);

  readonly plans = this.pricingService.plans;

  readonly matrix = this.pricingService.matrix;

  choosePlan(tier: PlanTier|string): void {
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
          res.message || 'Could not start checkout. Please try again.'
        );
      },
      error: (err) => {
        this.checkoutLoading.set(null);
        console.error('Checkout session error:', err);

        this.checkoutError.set(
          err?.error?.message || 'Could not start checkout. Please try again.'
        );
      },
    });

}
}
