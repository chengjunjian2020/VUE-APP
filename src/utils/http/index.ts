import type { AxiosResponse, AxiosInstance } from 'axios';
import { Axios } from './axios';
import { clone, isString } from 'lodash-es';
import { AxiosTransform, CreateAxiosOptions } from './AxiosTransform';
import { setObjToUrlParams } from './utils';
import { deepMerge } from '/@/utils';
import { ContentTypeEnum, ResultEnum, RequestEnum } from '/@/enums/httpEnum';
import { Result, RequestOptions } from '/@/types/axios';
import { ElMessage } from 'element-plus';
import { useGlobSetting } from '/@/hooks/setting/index';
import { AxiosRetry } from './axiosRetry';
const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const transform: AxiosTransform = {
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, urlPrefix } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    if (joinParamsToUrl) {
      config.url = setObjToUrlParams(
        config.url as string,
        Object.assign({}, config.params, config.data),
      );
    }
    return config;
  },
  /**
   * 请求拦截器
   * @param config
   * @param options
   */
  requestInterceptors: (config) => {
    //TODO token
    const token = '111';
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      (config as Recordable).headers.Authorization = token;
    }
    return config;
  },

  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    if (isReturnNativeResponse) {
      return res;
    }
    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;
    if (!data) {
      throw new Error('HTTP Data is not defined');
    }
    const { code, result, message } = data;
    switch (code) {
      case ResultEnum.SUCCESS:
        return result;
      case ResultEnum.TIMEOUT:
        // TODO 执行退出逻辑
        break;
      default:
        ElMessage.error(message);
    }
  },
  /**
   * 响应错误处理
   * @param axiosInstance
   * @param error
   */
  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    // const;
    //TODO 后面做错误处理
    try {
      const { config } = error;
      if (config.method?.toUpperCase() === RequestEnum.GET) {
        const axiosRetry = new AxiosRetry();
        axiosRetry.retry(axiosInstance as unknown as AxiosInstance, error);
      }
    } catch (e) {
      throw new Error(error as unknown as string);
    }

    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new Axios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: false,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: false,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
          isRetryRequest: true,
        },
      },
      opt,
    ),
  );
}
export const defHttp = createAxios();
