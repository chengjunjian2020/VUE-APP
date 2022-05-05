import type { AppRouteRecordRaw } from '/@/router/types';
import { ExceptionPage, LAYOUT } from '/@/router/constant';
export const Exception: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'Exception',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'EXCEPTION',
      component: ExceptionPage,
      meta: {
        title: 'EXCEPTION',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: 'redirect',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'redirect',
      component: () => import('/@/view/redirect/index.vue'),
      meta: {
        title: 'redirect',
        hideBreadcrumb: true,
      },
    },
  ],
};
