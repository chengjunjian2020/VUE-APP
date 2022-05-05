export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number;
    // title
    title: string;
    // dynamic router level.
    dynamicLevel?: number;
    // dynamic router real route path (For performance).
    realPath?: string;
    // 忽略权限
    ignoreAuth?: boolean;
    // role info
    roles?: RoleEnum[];
    // Whether not to cache
    ignoreKeepAlive?: boolean;
    // Is it fixed on tab
    affix?: boolean;
    // icon on tab
    icon?: string;
    frameSrc?: string;
    // current page transition
    transitionName?: string;
    // 是否已动态添加路由
    hideBreadcrumb?: boolean;
    // 隐藏菜单
    hideChildrenInMenu?: boolean;
    // Carrying parameters
    carryParam?: boolean;
    // Used internally to mark single-level menus
    single?: boolean;
    // Currently active menu
    currentActiveMenu?: string;
    // Never show in tab
    hideTab?: boolean;
    // Never show in menu
    hideMenu?: boolean;
    isLink?: boolean;
    // only build for Menu
    ignoreRoute?: boolean;
    // Hide path for children
    hidePathForChildren?: boolean;
  }
}
