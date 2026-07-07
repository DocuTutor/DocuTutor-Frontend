import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle';
import { LogoComponent } from '../../../../shared/components/logo-component/logo-component';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher.component';
import { LogoutComponent } from '../../../../features/authentication/pages/logout.component';
import { AuthService } from '../../../../core/services/auth.service';
import { NavLink } from '../../models/app-layout.models';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';



@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './app-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    TranslatePipe,
    ThemeToggleComponent,
    LogoComponent,
    LanguageSwitcherComponent,
    LogoutComponent,
    MobileDrawerComponent,
  ],
})
export class AppNavbarComponent {
  private readonly authService = inject(AuthService);

  readonly links: NavLink[] = [
    { labelKey: 'nav.product', fragment: 'features' },
    { labelKey: 'nav.howItWorks', fragment: 'how' },
    { labelKey: 'nav.pricing', fragment: 'pricing' },
    { labelKey: 'nav.faq', fragment: 'faq' },
  ];

  readonly isAuthenticated = this.authService.isAuthenticated;

  readonly drawerOpen = signal(false);
  
}