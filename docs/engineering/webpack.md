# Webpack

Webpack 以 entry 建立模块图并输出到 output。module.rules 用 loader 转换单文件，plugin 通过 Tapable hooks 介入整个生命周期，mode 提供面向开发或生产的默认优化。

## Loader 与 Plugin

loader 正常阶段从右向左执行，pitch 阶段从左向右执行，并可短路后续资源加载。loader 应聚焦输入文件到模块源码的转换。

Compiler 代表一次完整配置和构建生命周期；Compilation 代表本轮构建的模块、chunk 和 assets，在 watch 下会产生多轮。plugin 可监听二者的 hook，实现资源清单、压缩或 HTML 生成。

## 输出与更新

- module graph 经分块规则转成 chunk graph。
- runtime 保存模块注册与 chunk 加载逻辑，manifest 保存模块/chunk 标识映射。
- `import()` 创建异步边界，SplitChunksPlugin 抽取共享代码，`runtimeChunk` 可稳定业务 chunk 的缓存。
- HMR runtime 获取 update manifest，再下载 hot-update chunk，由模块的 accept/dispose 逻辑决定更新或回退刷新。

filesystem cache 必须把源码、依赖快照、配置、loader/plugin 和环境纳入失效判断。缓存异常首先清缓存验证，再找遗漏输入。

Webpack 与 Vite 的核心差异在开发架构、转换时机和生态；生产能力、插件兼容、迁移成本也应一起比较，不能只给速度结论。
