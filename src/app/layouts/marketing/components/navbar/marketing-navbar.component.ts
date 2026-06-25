import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeToggleComponent } from "../../../../shared/components/theme-toggle/theme-toggle";
import { LogoComponent } from "../../../../shared/components/logo-component/logo-component";

@Component({
  selector: 'app-marketing-navbar',
  templateUrl: './marketing-navbar.component.html',
  styleUrls: ['./marketing-navbar.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggleComponent, LogoComponent],
})
export class MarketingNavbarComponent {

    links = [
    { label: "Product", href: "/#features" },
    { label: "How it works", href: "/#how" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];
}
