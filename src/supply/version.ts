import { CONFIG } from "../config";
import { savePackage } from "./data";
import { log } from "./log";

/**
 * 更新 Package 版本号
 * @param version 版本号
 */
export function updateVersion(version: string) {
  let ver = version
    .replace(/v/i, "")
    ?.split(".")
    ?.reduce((str, cur, i) => {
      if (!i) str = cur;
      else if (i < 3) str += `.${cur}`;
      return str;
    }, "");

  if (CONFIG.PACKAGE.version === ver)
    throw Error(`版本号相同(${ver})，请修改版本号`);
  CONFIG.PACKAGE.version = ver;
  savePackage(CONFIG.PACKAGE);
  log("DONE", `package.json 版本号更新完成 ${ver}`);
}
