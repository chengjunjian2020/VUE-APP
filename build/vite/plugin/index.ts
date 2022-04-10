import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'; //配置vue3 jsx
import legacy from '@vitejs/plugin-legacy'; // 兼容旧版本浏览器不支持ESM机制
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const { VITE_LEGACY } = viteEnv;
    const vitePlugins: (PluginOption | PluginOption[])[] = [
        // have to
        vue(),
        // have to
        vueJsx(),
        // support name
        vueSetupExtend(),
    ];
    VITE_LEGACY && isBuild && vitePlugins.push(legacy());
}