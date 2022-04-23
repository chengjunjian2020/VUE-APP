import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { convertEnv } from './build/utils';
import { resolve } from "path";
import { OUTPUT_DIR } from './build/config';
import { createVitePlugins } from './build/vite/plugin';
// https://vitejs.dev/config/

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(); //返回nodejs当前工作目录
  const env = loadEnv(mode, root);
  //读取env配置布尔类型是字符串，转换成boolean
  const viteEnv = convertEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';

  // plugins: createVitePlugins(),
  // css: {
  //   //* css模块化
  //   modules: { // css模块化 文件以.module.[css|less|scss]结尾
  //     generateScopedName: '[name]__[local]___[hash:base64:5]',
  //     hashPrefix: 'prefix',
  //   },
  //   //* 预编译支持less
  //   preprocessorOptions: {
  //     less: {
  //       // 支持内联 JavaScript
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
  // base: './'
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/@\//,
          replacement: pathResolve('public') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      port: VITE_PORT,
      host: true,
      open: true,
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      brotliSize: false,
      chunkSizeWarningLimit: 1024,
    },
    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        hashPrefix: 'prefix',
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  };
};
