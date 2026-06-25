import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.theme;
  readonly isDark = this.themeService.isDark;

  readonly ariaLabel = computed(() =>
    this.isDark() ? 'Switch to light mode' : 'Switch to dark mode'
  );

  toggleTheme(): void {
    this.themeService.toggle();
  }
}