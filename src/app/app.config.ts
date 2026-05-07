import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './@interceptor/auth-interceptor';
import { provideNativeDateAdapter,MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'yyyy/MM/dd',
    monthYearLabel: 'yyyy MMM',
    dateA11yLabel: 'yyyy/MM/dd',
    monthYearA11yLabel: 'yyyy MMMM',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideNativeDateAdapter(),{
      provide: MAT_DATE_LOCALE,
      useValue: 'zh-TW'
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS
    }
  ]
};
