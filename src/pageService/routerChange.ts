/**
 * 通过订阅发布者通知替换路由守卫的通知，性能快很多
 */
import type { RouteLocationNormalized } from 'vue-router';
import { getRawRoute } from '/@/utils';
import mitt from 'mitt';

const emitter = mitt();

const eventName = Symbol();

let lastChangeTab: RouteLocationNormalized;

export function setRouterChange(router: RouteLocationNormalized) {
  const routerItem = getRawRoute(router);
  emitter.emit(eventName, routerItem);
  lastChangeTab = routerItem;
}

export function listenerRouterChange(callback: (router: any) => void, immediate = true) {
  emitter.on(eventName, callback);
  immediate && lastChangeTab && callback(lastChangeTab);
}

export function removeTabListener() {
  emitter.off(eventName);
}
