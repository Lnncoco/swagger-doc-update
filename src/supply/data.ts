const fs = require("fs");
const { resolve } = require("path");
const axios = require("axios");
const writeJson = require("write-json");
import { CONFIG, PACKAGE_KEY } from "../config";
import { log } from "./log";

/**
 * 读取 Package 配置信息
 */
export function readPackage() {
  const PATH = `${resolve("./")}/package.json`;
  CONFIG.PACKAGE = require(PATH);
  const config = CONFIG.PACKAGE[PACKAGE_KEY];
  if (!config) throw Error(`未找到 ${PACKAGE_KEY} 配置信息`);

  if (config.host) CONFIG.host = config.host;
  else throw Error(`请填写 host 字段信息`);

  if (config.output) CONFIG.output = config.output;
  if (config.suffix) CONFIG.suffix = config.suffix;
  if (config.timeout) CONFIG.timeout = config.timeout;
}

/**
 * 获取 swagger json
 */
export function getSwaggerJson() {
  let start = 0;
  let end = CONFIG.host.length;
  if (CONFIG.host[CONFIG.host.length - 1] === "/") end -= 1;
  const server = CONFIG.host.substring(start, end);
  return axios.get(`${server}${CONFIG.suffix}`, {
    timeout: Number(CONFIG.timeout),
  });
}

/**
 * 保存 swagger json
 * @param content
 */
export function saveSwaggerJson(content: swaggerDoc) {
  try {
    fs.writeFileSync(`./${CONFIG.output}`, JSON.stringify(content));
  } catch (e) {
    throw Error(`${e.name}: ${e.message}`);
  }
  log("DONE", `${CONFIG.output} 更新完成 ${content?.info?.version}`);
  return content?.info?.version;
}

/**
 * 保存 Package
 */
export function savePackage(data: any) {
  const PATH = `${resolve("./")}/package.json`;
  try {
    writeJson.sync(PATH, data);
  } catch (e) {
    throw Error(`${e.name}: ${e.message}`);
  }
}

interface swaggerDoc {
  swagger: string;
  info: {
    description: string;
    version: string;
    title: string;
  };
  host: string;
  basePath: string;
  tags: { name: string; description: string }[];
  paths: {
    // path
    [key: string]: {
      // method
      [key: string]: {
        tags: string[];
        summary: string;
        operationId: string;
        produces: any[];
        responses: { [key: string]: any };
      };
    };
  };
  definitions: any;
}
