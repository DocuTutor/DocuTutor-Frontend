import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle';
import { LogoComponent } from '../../../../shared/components/logo-component/logo-component';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher.component';

interface NavLink {
  labelKey: string;
  fragment: string;
}

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
  ],
})
export class AppNavbarComponent {
  readonly links: NavLink[] = [
    { labelKey: 'nav.product', fragment: 'features' },
    { labelKey: 'nav.howItWorks', fragment: 'how' },
    { labelKey: 'nav.pricing', fragment: 'pricing' },
    { labelKey: 'nav.faq', fragment: 'faq' },
  ];
}