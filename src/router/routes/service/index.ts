import { Router } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { ElNotification, ElMessage } from 'element-plus';
import nProgress from 'nprogress';
import { setRouterChange } from '/@/pageService/routerChange';
import { AxiosCanceler } from '/@/utils/http/axiosCancel';
import useUserStore from '/@/store/modules/user';
import useAppStore from '/@/store/modules/app';
export function setupRouterService(router: Router) {
  //处理页面相关状态
  createPageStatus(router);
  //处理页面loading状态
  createPageLoading(router);
  //处理页面axios请求操作
  handlePageHttpGuard(router);
  //处理进入页面后将位置重置到顶部
  handlePageScroll(router);
  //跳转页面后关闭消息以及消息弹框
  handleCloseMessage(router);
  //页面进度条
  createPageProgress(router);
}

function createPageStatus(router: Router) {
  const pageMap = new Map<string, boolean>();
  router.beforeEach((to) => {
    //页面已经加载过，许多东西缓存到了加载会很快，所以去掉loading
    to.meta.loading = !!pageMap.get(to.path);
    //路由通知
    setRouterChange(to);

    return true;
  });
  router.afterEach((to) => {
    pageMap.set(to.path, true);
  });
}

function createPageLoading(router: Router) {
  router.beforeEach((to) => {
    if (!useUserStore.token) {
      return true;
    }
    if (to.meta.loading) {
      return true;
    }

    //处理loading状态
    useAppStore.setPageLoading(true);

    return true;
  });

  router.afterEach(() => {
    useAppStore.setPageLoading(false);
  });
}

function handlePageHttpGuard(router: Router) {
  const { removeAllRequestPadding } = useAppStore.projectSetting;
  let axiosCanceler: AxiosCanceler;
  if (removeAllRequestPadding) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(() => {
    removeAllRequestPadding && axiosCanceler.removeAllRequest();
    return true;
  });
}

function handlePageScroll(router: Router) {
  const isHash = (href: string): boolean => {
    return /^#/.test(href);
  };

  router.afterEach((to) => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) && document.body.scroll(0, 0);
    return true;
  });
}

function handleCloseMessage(router: Router) {
  router.beforeEach(() => {
    const { switchPageCloseMessage } = useAppStore.projectSetting;
    if (switchPageCloseMessage) {
      ElNotification.closeAll();
      ElMessage.closeAll();
    }

    return true;
  });
}

function createPageProgress(router: Router) {
  const { openProgress } = useAppStore.projectSetting;
  router.beforeEach((to) => {
    if (to.meta.loaded) {
      return true;
    }
    openProgress && nProgress.start();
    return true;
  });
  router.beforeEach(() => {
    openProgress && nProgress.done();

    return true;
  });
}
