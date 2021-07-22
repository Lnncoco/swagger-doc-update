# swagger-doc-update

获取 Swagger JSON 并保存至本地项目中

## 使用

```
npm i -D swagger-doc-update
```

`package.json` 添加字段：

```
"docUpdate": {
  "host": "http://127.0.0.1",  // 服务器地址 必填
  "output": "swagger.json", // 保存文件名
  "suffix": "/v2/api-docs", // json url路径
  "timeout": 30000 // 超时时间
}
```
添加 `scripts`

```
"scripts": {
  "update": "doc-update"
}
```