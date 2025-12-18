import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import {
  SearchOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  ClearOutline,
  ArrowLeftOutline,
  BookOutline,
  UserOutline,
  TagsOutline,
  BarChartOutline,
  DownloadOutline
} from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';

registerLocaleData(pt);

const icons = [
  SearchOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  ClearOutline,
  ArrowLeftOutline,
  BookOutline,
  UserOutline,
  TagsOutline,
  BarChartOutline,
  DownloadOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideNzIcons(icons),
    provideNzI18n(pt_BR)
  ]
};
