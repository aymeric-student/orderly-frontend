import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { type Observable, of } from 'rxjs';
import { translations } from './i18n.translations';

export type Translation = { [key: string]: unknown };

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Translation> {
    return of(translations[lang] ?? {});
  }
}

export const i18nProviders = [
  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      },
    }),
  ),
];
