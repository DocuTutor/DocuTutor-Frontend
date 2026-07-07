import {ChangeDetectionStrategy,Component,ElementRef,HostListener,ViewChild,computed,effect,inject,input,output,} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageFacade } from '../../../../core/store/language/language.facade';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher.component';
import { LogoComponent } from '../../../../shared/components/logo-component/logo-component';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle';

export interface DashboardNavItem {
  to: string;
  label: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-dashboard-mobile-drawer',
  standalone: true,
  imports: [ NgClass, RouterLink, RouterLinkActive, TranslatePipe, LogoComponent, ThemeToggleComponent, LanguageSwitcherComponent,],
  templateUrl: './dashboard-mobile-drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMobileDrawerComponent {
  private readonly languageFacade = inject(LanguageFacade);
  readonly open = input.required<boolean>();
  readonly nav = input.required<DashboardNavItem[]>();
  readonly closed = output<void>();
  @ViewChild('panel') panel?: ElementRef<HTMLElement>;
  readonly isRtl = this.languageFacade.isRtl;

  readonly transform = computed(() => {
  if (this.open()) {
    return 'translateX(0)';
  }
  return this.isRtl() ? 'translateX(100%)' : 'translateX(-100%)';
});
  constructor() {
    effect(() => {
      const isOpen = this.open();
      if (typeof document === 'undefined') return;
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (isOpen) {
        queueMicrotask(() => this.panel?.nativeElement.focus());
      }
    });
  }
  requestClose(): void {
    this.closed.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === 'Escape' && this.open()) {
      this.requestClose();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (!this.open() || !this.panel) return;

    const focusable = this.panel.nativeElement.querySelectorAll<HTMLElement>(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (keyboardEvent.shiftKey && active === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && active === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }
}