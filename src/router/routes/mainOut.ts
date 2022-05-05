import type { AppRouteRecordRaw } from '/@/router/types';
//不位于layerbox组件包裹
export const mainOutRoutes: AppRouteRecordRaw[] = [
  {
    path: '/mainOut',
    name: 'mainOut',
    component: () => import('/@/view/main-out/index.vue'),
    meta: {
      title: 'mainout',
    },
  },
];
