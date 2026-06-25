import { Component, ChangeDetectionStrategy } from '@angular/core';
import { documents } from '../../features/workspace/models/workspace.mock';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardSidebarComponent } from "./components/sidebar/dashboard-sidebar.component";


@Component({
  selector: 'app-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.css'],
  imports: [RouterLink, RouterOutlet, DashboardSidebarComponent],
})
export class DashboardShellComponent {
  

}
