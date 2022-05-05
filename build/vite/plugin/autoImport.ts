// 自动导入
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function configAutoImport() {
  return AutoImport({
    resolvers: [ElementPlusResolver()],
  });
}
