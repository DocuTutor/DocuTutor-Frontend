import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

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
          )
  ]
};
