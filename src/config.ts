export const PACKAGE_KEY = "docUpdate";
export const CONFIG: {
  PACKAGE: any;
  [key: string]: any;
} = {
  host: "", // 服务器地址
  output: "swagger.json",
  suffix: "/v2/api-docs",
  timeout: 30000,
  PACKAGE: null, // 读取的 Package.json 信息
};
