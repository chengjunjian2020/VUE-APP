import type { AppRouteRecordRaw } from '/@/router/types';
import { Exception, REDIRECT_ROUTE } from '/@/router/routes/basic';
import { mainOutRoutes } from './mainOut';
import { LAYOUT } from '/@/router/constant';
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
  const result = modules[key].default || {};
  const moduleList = Array.isArray(result) ? result : [result];
  routeModuleList.push(...moduleList);
});
console.log(routeModuleList);
export const asyncRoutes = [Exception, ...routeModuleList];
const indexRouter: AppRouteRecordRaw = {
  path: '', //带有空 path 的命名子路由不再添加斜线
  name: 'Root',
  redirect: '/dashboard/analysis',
  meta: {
    title: 'Root',
  },
};
export const loginRouter: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('/@/view/login/index.vue'),
  meta: {
    title: '登录页面',
  },
};
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
      path: '/dashboard/analysis',
      name: 'Analysis',
      component: () => import('/@/view/login/index.vue'),
      meta: {
        // affix: true,
        title: '分析页',
      },
    },
  ],
};
console.log(dashboard);
export const routesConfig = [
  indexRouter,
  loginRouter,
  REDIRECT_ROUTE,
  mainOutRoutes,
  dashboard,
  Exception,
];
