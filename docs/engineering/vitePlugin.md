# 编写 Vite/Rollup 插件

虚拟模块能展示最核心的三个 hook：

```js
export default function buildInfo() {
  const publicId = 'virtual:build-info'
  const internalId = '\0' + publicId
  return {
    name: 'build-info',
    resolveId(id) {
      if (id === publicId) return internalId
    },
    load(id) {
      if (id === internalId) return 'export const mode = "demo"'
    },
  }
}
```

`resolveId` 取得内部 ID，`load` 提供内容，`transform` 修改已有模块。transform 改变位置时应同时返回 source map，否则后续错误定位会偏移。

## 生命周期

- `config/configResolved/configureServer` 是 Vite 特有阶段。
- `buildStart` 准备构建，`generateBundle` 可检查或修改内存产物，`writeBundle` 在写盘后执行。
- `enforce: 'pre' | 'post'` 调整顺序，`apply: 'serve' | 'build'` 限定环境。

插件读取额外文件时要加入 watch，并把文件内容、配置和环境纳入缓存失效。HMR hook 可返回精确受影响模块或发送自定义事件；无法维护状态时应明确触发完整刷新。

Rollup hook 可兼容不表示 dev 与 build 完全一致。开发期有浏览器原生 ESM、Vite module graph 和中间件，生产期还有分块与最终 render，因此插件必须两条路径都测试。
