import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from './components/navbar/app-navbar.component';
import { AppFooterComponent,  } from './components/footer/app-footer.component';
import { AppLayoutMockService } from './app-layout.mock.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
  standalone: true,
  imports: [ AppNavbarComponent, AppFooterComponent,TranslatePipe],
  
})
export class AppLayoutComponent {

 private readonly mock = inject(AppLayoutMockService);

  readonly avatars = this.mock.avatars;
  readonly unis = this.mock.unis;
  readonly steps = this.mock.steps;
  readonly features = this.mock.features;
  readonly stats = this.mock.stats;
  readonly testimonials = this.mock.testimonials;
  readonly miniPricing = this.mock.miniPricing;
  readonly faqKeys = this.mock.faqKeys;

  readonly pad = (n: number) => String(n).padStart(2, '0');

  
}
