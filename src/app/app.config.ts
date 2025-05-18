import { routes } from '@/app.routes';
import {
  ADDRESS_SERVICE,
  AddressService,
} from '@/core/components/address-dialog/services/Address.service';
import {
  COUNTRY_SERVICE,
  CountryService,
} from '@/core/components/address-dialog/services/CountryFlag.service';
import {
  DATE_SERVICE,
  DateFnsService,
} from '@/core/services/DateFnsService.service';
import { reducers } from '@/core/stores/carts/app.reducer';
import { i18nProviders } from '@/lib/i18n/i18n.providers';
import { provideHttpClient } from '@angular/common/http';
import {
  type ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as Sentry from '@sentry/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
    ),
    provideStore(reducers),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25,
    }),
    {
      provide: DATE_SERVICE,
      useClass: DateFnsService,
    },
    {
      provide: COUNTRY_SERVICE,
      useClass: CountryService,
    },
    {
      provide: ADDRESS_SERVICE,
      useClass: AddressService,
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [],
    },
    ...i18nProviders,
  ],
};
