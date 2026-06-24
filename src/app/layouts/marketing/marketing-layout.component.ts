import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketingNavbarComponent } from './components/navbar/marketing-navbar.component';
import { MarketingFooterComponent } from './components/footer/marketing-footer.component';


@Component({
  selector: 'app-marketing-layout',
  templateUrl: './marketing-layout.component.html',
  styleUrls: ['./marketing-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, MarketingNavbarComponent]//, MarketingFooterComponent],
  
})
export class MarketingLayoutComponent {}
