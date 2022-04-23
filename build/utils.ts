import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
export function convertEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};
  for (const envKey of Object.keys(envConf)) {
    let realName = envConf[envKey].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envKey === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envKey === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envKey] = realName;
    if (typeof realName === 'string') {
      process.env[envKey] = realName;
    } else if (typeof realName === 'object') {
      process.env[envKey] = JSON.stringify(realName);
    }
  }
  return ret;
}

//是否在打包后预览模块占用空间
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}
/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp('--mode ([a-z_\\d]+)');
  const result = reg.exec(script as string) as any;
  if (result) {
    const mode = result[1] as string;
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}
/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {};
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${item}`, e);
    }
  });
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}
