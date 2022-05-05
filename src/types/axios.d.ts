export interface RequestOptions {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  // 是否处理请求结果
  isTransformResponse?: boolean;
  // 是否返回本机响应头
  isReturnNativeResponse?: boolean;
  // 拼接url
  joinPrefix?: boolean;
  // 请求前缀，如果保留为空，则使用默认apiUrl
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // 是否添加时间戳
  joinTime?: boolean;
  // 是否取消验证
  ignoreCancelToken;
  // 是否发送token
  withToken?: boolean;
  // 是否启用重试请求
  isRetryRequest?: boolean;
  // 没有发送成功重新发送
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  isOpenRetry: boolean; //启用重新重试
  count: number; //重新发送次数
  waitTime: number; //等待时间
}
export interface Result {
  code: number;
  message: string;
  result: T;
}

export interface UploadFileParams {
  fileList?: Array<File>;
  name?: string;
  data?: Recordable;
}
