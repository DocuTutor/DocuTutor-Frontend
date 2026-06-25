import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { LogoComponent } from "../../../../shared/components/logo-component/logo-component";
import { ThemeToggleComponent } from "../../../../shared/components/theme-toggle/theme-toggle";
interface NavItem {
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
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebarComponent {
readonly nav: NavItem[] = [
    { to: '/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
    { to: '/dashboard/upload', label: 'Upload', icon: '📤' },
    { to: '/dashboard/documents/neural-networks', label: 'Active document', icon: '📖' },
    { to: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ];
}
