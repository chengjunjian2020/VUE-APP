import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'; //配置vue3 jsx
import legacy from '@vitejs/plugin-legacy'; // 兼容旧版本浏览器不支持ESM机制
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configHtmlPlugin } from './html'; //处理html相关
import { configVisualizerConfig } from './visualizer';
import { configMockPlugin } from './mock';
import { configSvgIconsPlugin } from './svgSprite'; //生成雪碧图
import { configCompressPlugin } from './compress'; //才用gzip压缩
import { configImageminPlugin } from './imagemin'; //图片压缩
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_LEGACY,
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    vueSetupExtend(),
  ];
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  VITE_LEGACY && isBuild && vitePlugins.push(legacy()); //是否与旧浏览器兼容

  vitePlugins.push(configSvgIconsPlugin(isBuild));

  vitePlugins.push(configVisualizerConfig());
  if (isBuild) {
    vitePlugins.push(configImageminPlugin());
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }
  return vitePlugins;
}
