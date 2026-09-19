# Bundler 原理

Bundler 从 entry 开始重复执行 resolve、load、parse 和依赖遍历，得到 module graph；随后 link 导入导出、划分 chunk、render 包装代码并 emit assets。

## 两张图

module graph 描述源码模块的依赖关系。chunk graph 描述输出文件之间的同步和异步加载关系：多个模块可以合并进一个 chunk，同一模块也可能因构建策略出现在不同产物中。

静态依赖通常进入当前同步闭包，动态 import 形成异步边界。共享模块可能提取为 shared chunk。runtime module 保存模块缓存、公共路径和异步 chunk 加载逻辑。

scope hoisting 尝试把多个 ESM 放进同一函数作用域，减少模块包装开销，并给压缩器更多跨模块优化空间。

## 资源与增量构建

CSS、图片和 WASM 可由 loader/plugin 转成 JS 模块、独立 asset 或内联数据。最终策略取决于体积、缓存和运行时加载方式。

content hash 应由最终内容决定；构建缓存 key 还需覆盖源码、配置、插件及其版本、环境和解析条件。watch mode 收到文件变化后沿依赖和 importer 关系使受影响结果失效，而不是无条件重建全部模块。

一个可靠 bundler 还需处理循环依赖、live binding、条件导出、source map、错误定位、CSS 顺序和长期缓存。这些边界解释了教学版实现与生产工具的差距。
