/**
 * 可视化分析打包模块占用空间
 */
import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../../utils';

export function configVisualizerConfig() {
  console.log('预览', isReportMode());
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return [];
}
