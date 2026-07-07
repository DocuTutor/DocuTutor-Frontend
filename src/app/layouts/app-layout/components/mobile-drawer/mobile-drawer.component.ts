import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageFacade } from '../../../../core/store/language/language.facade';
import { DrawerLink, NavLink } from '../../models/app-layout.models';
import { LogoComponent } from '../../../../shared/components/logo-component/logo-component';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher.component';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle';
import { AuthService } from '../../../../core/services/auth.service';
import { LogoutComponent } from "../../../../features/authentication/pages/logout.component";


@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    TranslatePipe,
    LogoComponent,
    LanguageSwitcherComponent,
    ThemeToggleComponent,
    LogoutComponent
],
  templateUrl: './mobile-drawer.component.html',
  styleUrl: './mobile-drawer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileDrawerComponent {
  private readonly languageFacade = inject(LanguageFacade);
  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly open = input.required<boolean>();
  readonly links = input.required<NavLink[]>();
  readonly closed = output<void>();

  @ViewChild('panel') panel?: ElementRef<HTMLElement>;

  readonly isRtl = this.languageFacade.isRtl;

  readonly transform = computed(() => {
    if (this.open()) return 'translateX(0)';
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