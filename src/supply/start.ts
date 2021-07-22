import { log } from "./log";
import { updateVersion } from "./version";
import { readPackage, getSwaggerJson, saveSwaggerJson } from "./data";

export default function start() {
  readPackage();
  return getSwaggerJson()
    .then((res: any) => saveSwaggerJson(res.data))
    .then((version: string) => updateVersion(version))
    .catch((e: Error) => log("ERR", `${e.name} ${e.message}`));
}
