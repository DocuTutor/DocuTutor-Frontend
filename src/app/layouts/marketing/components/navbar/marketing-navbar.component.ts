import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Marketing Navbar Component
 * 
 * Recommendations:
 * - Logo on the left (clickable to home)
 * - Navigation links (Features, Pricing, Docs, Blog)
 * - Right side: Sign In / Sign Up buttons
 * - Sticky positioning on scroll
 * - Mobile hamburger menu (drawer/sidebar)
 * - Search functionality (optional)
 * - Dropdown menus for navigation items
 */
@Component({
  selector: 'app-marketing-navbar',
  templateUrl: './marketing-navbar.component.html',
  styleUrls: ['./marketing-navbar.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketingNavbarComponent {}
