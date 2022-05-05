import { isObject } from '/@/utils/is';
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function getRawRoute(router: RouteLocationNormalized): RouteLocationNormalized {
  if (!router) {
    return router;
  }
  const { matched, ...opt } = router;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => {
          return {
            meta: item.meta,
            name: item.name,
            path: item.path,
          };
        })
      : undefined) as unknown as RouteRecordNormalized[],
  };
}
