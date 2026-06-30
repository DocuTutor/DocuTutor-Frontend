import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
// import { authInterceptor } from './core/interceptors/auth-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

import { authInterceptor } from './core/interceptors/auth-interceptor';
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

        //Eman -> Search for better fit for best ux
        scrollPositionRestoration: 'top', //will go to top of page when navigating to a new route
        //scrolPositionRestoration: 'enabled', //will go to the last scroll position when navigating back to a previous route

        anchorScrolling: 'enabled'

      })
    ),
    // provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
