import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import {
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

// import { authInterceptor } from './core/interceptors/auth-interceptor';
import { translationInterceptor } from './core/interceptors/translation.interceptor';

import { DEFAULT_LANGUAGE } from './core/constants/supported-languages';
import { languageFeatureKey } from './core/store/language/language.state';
import { languageReducer } from './core/store/language/language.reducer';
import { LanguageEffects } from './core/store/language/language.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),

    provideHttpClient(
      withInterceptors([
        // authInterceptor,
        translationInterceptor,
      ]),
    ),

    provideStore({
      [languageFeatureKey]: languageReducer,
    }),

    provideEffects([LanguageEffects]),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
      fallbackLang: DEFAULT_LANGUAGE,
    }),
  ],
};