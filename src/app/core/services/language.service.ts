import { Injectable, inject } from '@angular/core';
import { LanguageFacade } from '../store/language/language.facade';
import type { Language } from '../types/language.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly facade = inject(LanguageFacade);

  readonly current$ = this.facade.current$;
  readonly direction$ = this.facade.direction$;
  readonly isRtl$ = this.facade.isRtl$;
  readonly supported = this.facade.supported;

  init(): void {
    this.facade.init();
  }

  use(language: Language): void {
    this.facade.setLanguage(language);
  }
}