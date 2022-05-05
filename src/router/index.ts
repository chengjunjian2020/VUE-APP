import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import { routesConfig } from './routes';
export const routes = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: routesConfig as unknown as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true,
});

export const setupRouter = (app: App<Element>): void => {
  app.use(routes);
};
