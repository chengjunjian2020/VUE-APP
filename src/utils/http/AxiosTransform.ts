import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '/@/types/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  // 请求前的流程配置
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  // 请求已成功处理
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  // 请求失败处理
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  // 请求拦截器
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig;
  //响应拦截器
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  //请求拦截器错误处理
  requestInterceptorsCatch?: (error: Error) => void;

  //响应拦截器错误处理
  responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void;
}
