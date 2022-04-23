import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../config';
import colors from 'picocolors';
import fs, { writeFileSync } from 'fs-extra';
import { getRootPath, getEnvConfig } from '../utils';
import pkg from '../../package.json';
import { getConfigFileName } from '../getConfigFileName';
interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName?: string;
}
function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params;

  try {
    const windowConf = `window.${configName}`;
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - 配置文件成功生成:`);
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n');
  } catch (error) {
    console.log(colors.red(`配置文件生成异常 \n ${error}`));
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
}
