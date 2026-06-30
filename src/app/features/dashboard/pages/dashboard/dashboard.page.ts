import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { DashboardPageMockService } from '../../services/dashboard.mock.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './dashboard.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly mock = inject(DashboardPageMockService);

  readonly stats = this.mock.stats;
  readonly quickActions = this.mock.quickActions;
  readonly documents = this.mock.documents;
  readonly bars = this.mock.bars;
  readonly days = this.mock.days;
  readonly tip = this.mock.tip;
}