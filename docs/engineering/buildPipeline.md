# 前端构建链路

构建工具把开发源码转换成浏览器或 Node.js 能加载的产物。常见链路是：

```text
entry → resolve/load → parse → transform → link → chunk → optimize → emit
```

## 工具职责

| 名称 | 主要职责 |
| --- | --- |
| parser | 把字符流解析为 AST |
| compiler | 对代码做分析、转换和生成的总称 |
| transpiler | 在相近抽象层级间转换语法，如 TS 到 JS |
| bundler | 遍历模块图并生成一个或多个 chunk |
| minifier | 压缩表达式、删除死代码、缩短标识符 |

解析、转换、生成三阶段让语法前端、变换逻辑和输出格式可以独立组合。单文件 `loader/transform` 适合源码变换，plugin 通常还能介入解析、分块和产物生成等全局阶段。

## 产物术语

- source file 是磁盘中的源码；module 是构建器分析后的模块记录。
- chunk 是分块后的输出单元；bundle 常泛指整组构建产物；asset 还包括 CSS、图片和字体。
- 构建时逻辑在开发机或 CI 执行；运行时逻辑会进入浏览器产物。

开发服务器追求启动快和增量更新，生产构建追求兼容、压缩和稳定缓存，所以常走不同路径。排错时需要分别复现 serve 与 build。

## 两个常见误区

语法转换只让旧环境读懂代码，不会凭空提供 `fetch` 等 API；API 兼容需要 polyfill。Babel 等工具可以擦除 TypeScript 类型，但类型检查仍需 `tsc --noEmit` 或等价工具。

## 面试回答

从入口说清模块解析、AST 转换、依赖链接、chunk 划分、压缩和 emit，再说明 source map 与 content hash 在生成阶段产生，比只罗列工具名更完整。
