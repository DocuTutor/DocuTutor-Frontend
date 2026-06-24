import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dashboard Topbar Component
 * 
 * Recommendations:
 * - Search bar (global search across documents)
 * - Notification bell with badge
 * - User profile dropdown
 * - Theme toggle (light/dark mode)
 * - Help/Support button
 * - Responsive: hamburger menu on mobile
 * - Sticky positioning for accessibility
 */
@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './dashboard-topbar.component.html',
  styleUrls: ['./dashboard-topbar.component.css'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopbarComponent {}
