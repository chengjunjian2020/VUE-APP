// 按需加载
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function configComponents() {
  return Components({
    resolvers: [ElementPlusResolver()],
  });
}
