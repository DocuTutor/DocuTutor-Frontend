import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebarComponent } from './components/sidebar/dashboard-sidebar.component';
import { DashboardTopbarComponent } from './components/topbar/dashboard-topbar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
   /* DashboardSidebarComponent,
    DashboardTopbarComponent,
    BreadcrumbComponent,*/
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardShellComponent {}
