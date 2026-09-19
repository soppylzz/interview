# Tree Shaking 与 Code Splitting

Tree Shaking 利用 ESM 静态结构标记可达导出，再删除不可达且无副作用的代码。未使用某个 export 不等于能删除整个模块，因为模块顶层仍可能注册事件、修改全局或导入 CSS。

`package.json#sideEffects` 告诉构建器哪些文件可安全整体裁剪。错误地标记 `false` 可能删掉必要初始化；库作者应对 CSS 和副作用入口显式保留。

## 分块策略

动态 `import()` 形成 split point：

- route-level 通常收益稳定，让首屏只加载当前路由。
- component-level 适合低频重组件，但会增加加载状态和请求。
- vendor splitting 可改善缓存，也可能让页面被迫提前加载大公共块。

chunk 太大拖慢下载、解析和执行；太碎会增加请求、调度、压缩字典损失和运行时开销。shared chunk 能去重，也可能制造额外依赖和缓存联动。应结合真实导航瀑布图与命中率调整。

## 压缩指标

minify 是整体压缩过程；compress 改写和折叠表达式；mangle 缩短可安全修改的名字。原始体积反映解析和缓存成本，gzip/Brotli 体积更接近网络传输成本，两者都要观察。

Tree Shaking 失败时先查看 bundle analyzer 和构建器的 side-effect 判定，再定位导入链、CJS 边界、顶层副作用或错误的包元数据。
