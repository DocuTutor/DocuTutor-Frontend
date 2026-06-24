import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';

/**
 * Dashboard Sidebar Component
 * 
 * Recommendations:
 * - Main navigation categories (Dashboard, Documents, Chat, Settings)
 * - Active route indicator
 * - Icons for each menu item
 * - Collapsible section groups
 * - User profile mini card at top
 * - Toggle button for collapse/expand
 * - Hover effects and smooth transitions
 * - Scroll support for long menus
 */
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebarComponent {
  isCollapsed = signal(false);

  toggleCollapse() {
    this.isCollapsed.update((value) => !value);
  }
}
