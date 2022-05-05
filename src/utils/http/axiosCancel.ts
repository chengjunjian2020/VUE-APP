import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import { isFunction } from '../is';
const requestMap = new Map<string, Canceler>();

export const getRequestUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  /**
   * 添加请求
   * @param config
   */
  addRequest(config: AxiosRequestConfig) {
    //如果请求队列里还存在相同的请求则删除，拒绝重复请求把新请求的url保存队列当中
    this.removeRequest(config);
    const url = getRequestUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!requestMap.get(url)) {
          requestMap.set(url, cancel);
        }
      });
  }
  /**
   * 删除请求
   * @param config
   */
  removeRequest(config: AxiosRequestConfig) {
    const url = getRequestUrl(config);
    if (requestMap.has(url)) {
      const cancel = requestMap.get(url);
      cancel && cancel();
      requestMap.delete(url);
    }
  }
  /**
   * 删除队列中所有请求
   */
  removeAllRequest() {
    requestMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    requestMap.clear();
  }
  /**
   * 还原初始状态
   */
  reset(): void {
    requestMap.clear();
  }
}
