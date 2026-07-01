import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from './components/navbar/app-navbar.component';
import { AppFooterComponent,  } from './components/footer/app-footer.component';
import { AppLayoutMockService } from './app-layout.mock.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { SubscriptionService } from '../../features/subscription/services/subscription.service';
import { PlanTier } from '../../features/subscription/models/subscription.models';


@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
  standalone: true,
  imports: [ AppNavbarComponent, AppFooterComponent, RouterLink, TranslatePipe],

})
export class AppLayoutComponent {

 private readonly mock = inject(AppLayoutMockService);
 private readonly authService = inject(AuthService);
 private readonly subscriptionService = inject(SubscriptionService);
 private readonly router = inject(Router);

  readonly avatars = this.mock.avatars;
  readonly unis = this.mock.unis;
  readonly steps = this.mock.steps;
  readonly features = this.mock.features;
  readonly stats = this.mock.stats;
  readonly testimonials = this.mock.testimonials;
  readonly miniPricing = this.mock.miniPricing;
  readonly faqKeys = this.mock.faqKeys;

  readonly pad = (n: number) => String(n).padStart(2, '0');

  readonly checkoutLoading = signal<PlanTier | null>(null);
  readonly checkoutError = signal<string | null>(null);

  choosePlan(tier: PlanTier): void {
    if (tier === 'Free') {
      this.router.navigate(['/dashboard']);
      return;
    }

    if (!this.authService.getAccessToken()) {
      this.router.navigate(['/auth/register'], { queryParams: { plan: tier } });
      return;
    }

    this.checkoutError.set(null);
    this.checkoutLoading.set(tier);

    this.subscriptionService.createCheckoutSession(tier).subscribe({
      next: (res) => {
        this.checkoutLoading.set(null);
        if (res.isSuccess) {
          window.location.href = res.data.checkoutUrl;
        } else {
          this.checkoutError.set(res.message || 'Could not start checkout. Please try again.');
        }
      },
      error: (err) => {
        this.checkoutLoading.set(null);
        console.error('Checkout session error:', err);
        this.checkoutError.set(err.error?.message || 'Could not start checkout. Please try again.');
      },
    });
  }
}
