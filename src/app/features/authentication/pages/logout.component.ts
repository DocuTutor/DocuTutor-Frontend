import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);

  logout(): void {
    this.loading.set(true);

    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res)
        this.authService.clearSession();
        this.router.navigateByUrl('/', { replaceUrl: true });
        this.loading.set(false);
      },
      error: () => {
        this.authService.clearSession();
        this.authService.forceLogout();
        this.loading.set(false);
      },
    });
  }
}
