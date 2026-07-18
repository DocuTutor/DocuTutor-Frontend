import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { LogoComponent } from '../../../../shared/components/logo-component/logo-component';

interface FooterColumn {
  titleKey: string;
  items: readonly FooterLink[];
}

interface FooterLink {
  labelKey: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './app-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoComponent, RouterLink, TranslatePipe],
})
export class AppFooterComponent {
  readonly socials = ['𝕏', 'in', '▶'];

  readonly cols: readonly FooterColumn[] = [
    {
      titleKey: 'footer.columns.product',
      items: [
        { labelKey: 'footer.links.features', route: '/' },
        { labelKey: 'footer.links.pricing', route: '/pricing' },
        { labelKey: 'footer.links.dashboard', route: '/dashboard' },
        { labelKey: 'footer.links.changelog', route: '/' },
      ],
    },
    {
      titleKey: 'footer.columns.resources',
      items: [
        { labelKey: 'footer.links.help', route: '/' },
        { labelKey: 'footer.links.guides', route: '/' },
        { labelKey: 'footer.links.blog', route: '/' },
        { labelKey: 'footer.links.roadmap', route: '/' },
      ],
    },
    {
      titleKey: 'footer.columns.company',
      items: [
        { labelKey: 'footer.links.about', route: '/' },
        { labelKey: 'footer.links.careers', route: '/' },
        { labelKey: 'footer.links.privacy', route: '/' },
        { labelKey: 'footer.links.terms', route: '/' },
      ],
    },
  ];
}