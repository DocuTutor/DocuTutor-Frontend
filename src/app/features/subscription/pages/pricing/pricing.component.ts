import { Component, inject } from '@angular/core';
import { AppFooterComponent } from '../../../../layouts/app-layout/components/footer/app-footer.component';
import { AppNavbarComponent } from '../../../../layouts/app-layout/components/navbar/app-navbar.component';
import { RouterLink } from '@angular/router';
import { PricingMockService } from '../../services/pricing-mock.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  imports: [AppNavbarComponent, AppFooterComponent, RouterLink,TranslatePipe],
})
export class PricingComponent {

  private readonly pricingService = inject(PricingMockService);

  readonly plans = this.pricingService.plans;

  readonly matrix = this.pricingService.matrix;

}
