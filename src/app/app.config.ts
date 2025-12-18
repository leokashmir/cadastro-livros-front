import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
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
    provideNzIcons(icons)
  ]
};
