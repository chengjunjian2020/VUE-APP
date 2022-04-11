export function convertEnv(envConf: Recordable): ViteEnv {
    const ret: any = {};
    for (const envKey of Object.keys(envConf)) {
        let realName = envConf[envKey].replace(/\\n/g, '\n')
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
    return ret
}