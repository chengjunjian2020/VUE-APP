import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { UploadFileParams, RequestOptions } from '/@/types/axios';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import type { CreateAxiosOptions } from './AxiosTransform';
import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '../is';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import type { Result } from '/@/types/axios';
export class Axios {
  private instanceof: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(option: CreateAxiosOptions) {
    this.options = option;
    this.instanceof = axios.create(option);
    this.configInterceptors();
  }
  /**
   * 获取axios实例
   * @returns AxiosInstance
   */
  getAxios(): AxiosInstance {
    return this.instanceof;
  }
  /**
   *
   * @returns void
   */
  setHeader(headers: any): void {
    if (!this.instanceof) {
      console.error('请创建Axios实例');
      return;
    }
    Object.assign(this.instanceof.defaults.headers, headers);
  }
  /**
   * 拦截器配置
   */
  configInterceptors() {
    const { transform } = this.options;
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;
    const axiosCanceler = new AxiosCanceler();

    this.instanceof.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        //是否取消禁止重复请求
        // @ts-ignore
        const { ignoreCancelToken } = config.requestOptions;
        const ignoreCancel =
          ignoreCancelToken !== 'undefined'
            ? ignoreCancelToken
            : this.options.requestOptions?.ignoreCancelToken;
        !ignoreCancel && axiosCanceler.addRequest(config);
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options);
        }
        return config;
      },
      requestInterceptorsCatch && isFunction(responseInterceptorsCatch)
        ? requestInterceptorsCatch
        : undefined,
    );

    this.instanceof.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        res && axiosCanceler.removeRequest(res.config);
        if (responseInterceptors && isFunction(responseInterceptors)) {
          res = responseInterceptors(res);
        }
        return res;
      },
      (error) => {
        if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
          // @ts-ignore
          responseInterceptorsCatch(this.instanceof, error);
        }
      },
    );
  }
  /**
   * 文件上传
   * @param config
   * @param params
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new FormData();
    const customeFilename = params.name || 'file';
    const { fileList } = params;
    fileList?.forEach((file) => {
      formData.append(customeFilename, file);
    });
    return this.instanceof.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const { transform, requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);
    conf.requestOptions = opt;

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    return new Promise((resolve, reject) => {
      this.instanceof
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            console.warn(e);
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}
