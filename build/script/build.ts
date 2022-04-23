import colors from 'picocolors';
import { runBuildConfig } from './buildConf';
import pkg from '../../package.json';
export const runBuild = () => {
  try {
    const argvList = process.argv.splice(2);
    console.log('build==?', argvList);
    // Generate configuration file
    if (!argvList.includes('disabled-config')) {
      runBuildConfig();
    }

    console.log(`✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (error) {
    console.log(colors.red('vite build error:\n' + error));
    process.exit(1);
  }
};
runBuild();
