import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { map, tap } from 'rxjs/operators';

import { DEFAULT_LANGUAGE, STORAGE_KEY, SUPPORTED_LANGUAGES } from '../../constants/supported-languages';
import { LanguageActions } from './language.actions';
import type { Direction, Language } from '../../types/language.type';

@Injectable()
export class LanguageEffects {
  private readonly actions$ = inject(Actions);
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  constructor() {
    this.translate.addLangs(SUPPORTED_LANGUAGES.map((item) => item.code));
    this.translate.setFallbackLang(DEFAULT_LANGUAGE);
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.init),
      map(() => {
        const language = this.readLanguage();
        const direction = this.getDirection(language);

        return LanguageActions.initSuccess({ language, direction });
      }),
    ),
  );

  setLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.setLanguage),
      map(({ language }) => {
        const direction = this.getDirection(language);

        return LanguageActions.setLanguageSuccess({ language, direction });
      }),
    ),
  );

  syncLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LanguageActions.initSuccess, LanguageActions.setLanguageSuccess),
        tap(({ language, direction }) => {
          this.translate.use(language);

          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, language);
          }

          this.document.documentElement.lang = language;
          this.document.documentElement.dir = direction;
        }),
      ),
    { functional: false, dispatch: false },
  );

  private readLanguage(): Language {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;

      if (stored && SUPPORTED_LANGUAGES.some((item) => item.code === stored)) {
        return stored;
      }
    } catch {
      // noop
    }

    return DEFAULT_LANGUAGE;
  }

  private getDirection(language: Language): Direction {
    return SUPPORTED_LANGUAGES.find((item) => item.code === language)?.direction ?? 'ltr';
  }
}