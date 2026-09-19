# Vite

Vite 开发服务器利用浏览器原生 ESM，收到请求时才解析和转换源码。传统 bundle-first 服务通常先生成一份完整开发 bundle；项目增大时，两者的启动成本差异会更明显。

## 开发过程

1. 浏览器请求入口，Vite 转换其中的 import。
2. bare import 被解析并改写成浏览器可请求的 URL。
3. 依赖预构建把 CommonJS/UMD 转成可消费的 ESM，并合并过碎依赖以减少请求。
4. module graph 记录 importer、依赖和 HMR 接受边界。
5. 文件改变后只失效相关模块；找到 HMR 边界就推送更新，否则整页刷新。

React Fast Refresh 在通用 HMR 上额外维护组件状态和组件边界；它不是所有模块都能无状态热替换的证明。

## 配置与插件

`import.meta.env` 在构建时替换。mode 决定加载哪些 `.env` 文件，只有规定前缀的变量会暴露给客户端，以减少误泄露；任何进入客户端 bundle 的值都不能当秘密。

`resolveId` 决定请求指向哪里，`load` 提供源码，`transform` 变换源码。插件可用约定前缀生成 virtual module。Vite 还有 `configureServer` 等开发专用 hook，兼容 Rollup 风格 hook 不代表 serve 与 build 的行为完全一致。

当前版本的 Vite 已采用 Rolldown 参与依赖预构建和生产构建；历史版本常以 esbuild 预构建、Rollup 生产打包。面试时应先说明版本范围。

## 排错顺序

分别运行 dev、build 和 preview；再检查浏览器 ESM 解析、条件导出、插件的 `apply/enforce`、环境变量替换与生产分块。不要用开发正常推断生产一定正常。
