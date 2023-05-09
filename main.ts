import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//lex.infosysapps.com/en/viewer/web-module/lex_auth_012797030965592064558?collectionId=lex_auth_01263926304025804810&collectionType=Learning%20Path
https: if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
