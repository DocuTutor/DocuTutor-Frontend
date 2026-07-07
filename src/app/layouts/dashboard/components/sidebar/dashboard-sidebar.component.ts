import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { LogoComponent } from "../../../../shared/components/logo-component/logo-component";
import { ThemeToggleComponent } from "../../../../shared/components/theme-toggle/theme-toggle";
import { LanguageSwitcherComponent } from "../../../../shared/components/language-switcher/language-switcher.component";
import { TranslatePipe } from '@ngx-translate/core';
import { DashboardMobileDrawerComponent } from '../dashboard-mobile-drawer/dashboard-mobile-drawer.component';
export interface NavItem {
  to: string;
  label: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, ThemeToggleComponent, LanguageSwitcherComponent,DashboardMobileDrawerComponent,TranslatePipe],
})
export class DashboardSidebarComponent {
readonly nav: NavItem[] = [
    { to: '/dashboard', label: 'nav.dashboard', icon: '🏠', exact: true },
    { to: '/dashboard/upload', label: 'nav.upload', icon: '📤' },
    { to: '/dashboard/documents/neural-networks', label: 'nav.activeDocument', icon: '📖' },
    { to: '/dashboard/settings', label: 'nav.settings', icon: '⚙️' },
  ];
  
}
