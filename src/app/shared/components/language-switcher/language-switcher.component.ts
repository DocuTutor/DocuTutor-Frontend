import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageService } from '../../../core/services/language.service';
import type { Language } from '../../../core/types/language.type';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './language-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);

  protected readonly supported = this.languageService.supported;
  protected readonly current = toSignal(this.languageService.current$, { initialValue: 'en' as Language });
  protected readonly open = signal(false);

  protected readonly currentDefinition = computed(
    () => this.supported.find((lang) => lang.code === this.current()) ?? this.supported[0]
  );

  select(code: Language): void {
    this.languageService.use(code);
    this.open.set(false);
  }

  toggleMenu(): void {
    this.open.update((value) => !value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('app-language-switcher')) {
      this.open.set(false);
    }
  }
}