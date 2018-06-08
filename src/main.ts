
import {CompilerOptions, enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'zone.js';
import 'reflect-metadata';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import {TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID} from '@angular/core';
import {LocaleService} from './app/services/locale.service';

getTranslationProviders().then(providers => {
  const options = {providers};
  // platformBrowserDynamic().bootstrapModule(AppModule, options)
  platformBrowserDynamic().bootstrapModule(AppModule, options as CompilerOptions)
    .catch(err => console.log(err));
});

export function getTranslationProviders(): Promise<Object[]> {
  // const locale = 'ru-RU';
  const locale = localStorage.getItem('locale');
  const noProviders: Object[] = [];
  if (!locale) {
    return Promise.resolve(noProviders);
  }
  const translationFile = `./locale/messages.${locale}.xlf`;
  console.log(translationFile);
  return getTranslationWithImports(translationFile)
    .then((translations: string) => [
      {provide: TRANSLATIONS, useValue: translations},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
      {provide: LOCALE_ID, useValue: locale},
    ])
    .catch(() => noProviders);
}

function getTranslationWithImports(file: string) {
  const service = new LocaleService();
  return service.getFile(file);
}

