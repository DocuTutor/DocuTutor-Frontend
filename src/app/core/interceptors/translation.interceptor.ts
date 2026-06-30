import { inject } from '@angular/core';
import type { HttpInterceptorFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectCurrentLanguage } from '../store/language/language.selectors';

export const translationInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const currentLanguage = store.selectSignal(selectCurrentLanguage);

  return next(
    req.clone({
      setHeaders: {
        'Accept-Language': currentLanguage(),
      },
    }),
  );
};