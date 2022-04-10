import type { UserConfig, ConfigEnv } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
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
    base: 
  }
}
