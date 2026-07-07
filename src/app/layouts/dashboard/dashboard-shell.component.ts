import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { documents } from '../../features/workspace/models/workspace.mock';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardSidebarComponent, NavItem } from "./components/sidebar/dashboard-sidebar.component";
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardMobileDrawerComponent } from './components/dashboard-mobile-drawer/dashboard-mobile-drawer.component';


@Component({
  selector: 'app-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.css'],
  imports: [ RouterOutlet, DashboardSidebarComponent,DashboardHeaderComponent,
    DashboardMobileDrawerComponent],
})
export class DashboardShellComponent {
  readonly drawerOpen = signal(false);

  readonly nav: NavItem[] = [
    { to: '/dashboard', label: 'nav.dashboard', icon: '🏠', exact: true },
    { to: '/dashboard/upload', label: 'nav.upload', icon: '📤' },
    { to: '/dashboard/documents/neural-networks', label: 'nav.activeDocument', icon: '📖' },
    { to: '/dashboard/settings', label: 'nav.settings', icon: '⚙️' },
  ];

  openDrawer(): void {
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  toggleDrawer(): void {
    this.drawerOpen.set(!this.drawerOpen());
  }
}
