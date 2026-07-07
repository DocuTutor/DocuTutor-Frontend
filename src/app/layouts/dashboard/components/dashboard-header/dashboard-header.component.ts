import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LogoComponent } from '../../../../shared/components/logo-component/logo-component';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle';
@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [TranslatePipe, LogoComponent, ThemeToggleComponent],
  templateUrl: './dashboard-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent {
  readonly drawerOpen = input.required<boolean>();
  readonly menuClicked = output<void>();
}