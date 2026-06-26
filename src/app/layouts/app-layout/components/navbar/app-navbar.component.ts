import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeToggleComponent } from "../../../../shared/components/theme-toggle/theme-toggle";
import { LogoComponent } from "../../../../shared/components/logo-component/logo-component";
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggleComponent, LogoComponent,RouterModule],
})
export class AppNavbarComponent {

  //   links = [
  //   { label: "Product", href: "/#features" },
  //   { label: "How it works", href: "/#how" },
  //   { label: "Pricing", href: "/#pricing" },
  //   { label: "FAQ", href: "/#faq" },
  // ];
  links = [
  { label: "Product", fragment: "features" },
  { label: "How it works", fragment: "how" },
  { label: "Pricing", fragment: "pricing" },
  { label: "FAQ", fragment: "faq" },
];
}
