import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeToggleComponent } from "../../../../shared/components/theme-toggle/theme-toggle";
import { LogoComponent } from "../../../../shared/components/logo-component/logo-component";

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggleComponent, LogoComponent],
})
export class AppNavbarComponent {

    links = [
    { label: "Product", href: "/#features" },
    { label: "How it works", href: "/#how" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];
}
