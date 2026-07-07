import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageActions } from './language.actions';
import {selectCurrentLanguage,selectDirection,selectIsRtl,selectLanguageInitialized} from './language.selectors';
import { SUPPORTED_LANGUAGES } from '../../constants/supported-languages';
import type { Language } from '../../types/language.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageFacade {
  private readonly store = inject(Store);

  readonly current$ = this.store.select(selectCurrentLanguage);
  readonly direction$ = this.store.select(selectDirection);
  readonly isRtl$ = this.store.select(selectIsRtl);
  readonly initialized$ = this.store.select(selectLanguageInitialized);
  readonly supported = SUPPORTED_LANGUAGES;

  readonly current = this.store.selectSignal(selectCurrentLanguage);
  readonly direction = this.store.selectSignal(selectDirection);
  readonly isRtl = this.store.selectSignal(selectIsRtl);
  readonly initialized = this.store.selectSignal(selectLanguageInitialized);

  init(): void {
    this.store.dispatch(LanguageActions.init());
  }

  setLanguage(language: Language): void {
    this.store.dispatch(LanguageActions.setLanguage({ language }));
  }

  toggle(current: Language): void {
    this.setLanguage(current === 'en' ? 'ar' : 'en');
  }
}