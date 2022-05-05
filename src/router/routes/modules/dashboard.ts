import type { AppRouteRecordRaw } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: 'dashboard',
  },
  children: [
    {
      path: '/analysis',
      name: 'Analysis',
      component: () => import('/@/view/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: '分析页',
      },
    },
  ],
};

export default dashboard;
