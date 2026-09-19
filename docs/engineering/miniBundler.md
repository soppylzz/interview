# Mini Bundler 实现练习

这个练习的目标是理解模块图、运行时和分块，不是复刻生产 bundler。

## 最小同步版本

1. 从 entry 读取源码并解析 AST。
2. 收集静态 import，按 importer 解析真实路径。
3. 为规范化路径分配稳定 module ID；先登记再递归，避免循环依赖无限遍历。
4. 把 ESM import/export 转成内部模块函数。
5. 输出 `modules[id](module, exports, require)` 表和带 cache 的 `require`。

模块缓存必须在执行模块函数前创建，循环依赖才能观察到部分初始化的 exports。教学实现常复制值，无法完整模拟 ESM live binding，应在说明中标出这一语义差距。

## 加入异步分块

遇到 dynamic import 时建立 chunk graph，把异步闭包输出为独立文件；生成 content hash 和 manifest，让运行时从 module ID 找到 chunk URL。加载完成后注册模块，再执行目标模块。

可进一步设计 `resolve/load/transform` hook、资源发射与最小行列映射。测试覆盖重复依赖、循环依赖、动态共享模块和缓存。

生产工具还需处理条件导出、CJS/ESM 互操作、Tree Shaking、CSS 顺序、并发、错误恢复、增量缓存和标准 source map。面试时主动说明这些边界能体现对练习目的的理解。
