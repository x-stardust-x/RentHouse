import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { register } from 'swiper/element/bundle';

register();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


const hot = (import.meta as any).hot;

if (hot) {
  hot.accept(() => {
    window.location.reload();
  });
}
