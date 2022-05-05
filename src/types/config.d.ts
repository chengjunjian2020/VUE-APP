export interface ProjectConfig {
  //切换页面时是否取消已发送但未响应的http请求。
  removeAllRequestPadding: boolean;
  //切换页面是否关闭消息
  switchPageCloseMessage: boolean;
  //是否打开页面进度条显示
  openProgress: boolean;
}

export interface GlobEnvConfig {
  // 项目名
  VITE_GLOB_APP_TITLE: string;
  // 请求url
  VITE_GLOB_API_URL: string;
  // 请求url前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME: string;
  // 文件上传地址
  VITE_GLOB_UPLOAD_URL?: string;
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}
