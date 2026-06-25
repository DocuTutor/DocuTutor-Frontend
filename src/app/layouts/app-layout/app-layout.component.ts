import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from './components/navbar/app-navbar.component';
import { AppFooterComponent,  } from './components/footer/app-footer.component';
import { AppLayoutMockService } from './app-layout.mock.service';


@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, AppNavbarComponent, AppFooterComponent],
  
})
export class AppLayoutComponent {

  pad = (n: number) => String(n).padStart(2, "0");
  private readonly mockService = inject(AppLayoutMockService);

  readonly avatars = this.mockService.avatars;
  readonly unis = this.mockService.unis;
  readonly steps = this.mockService.steps;
  readonly features = this.mockService.features;
  readonly stats = this.mockService.stats;
  readonly testimonials = this.mockService.testimonials;
  readonly miniPricing = this.mockService.miniPricing;
  readonly faq = this.mockService.faq;

  
}
