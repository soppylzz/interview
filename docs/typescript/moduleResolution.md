# 模块系统与模块解析

`module` 控制 emit 的模块格式或保留方式，`moduleResolution` 控制如何把 specifier 找到文件，`target` 控制其他 JavaScript 语法的降级目标。三者解决不同问题，但部分现代模式会约束合理组合。

## 解析模式

- `node16` 模拟稳定 Node ESM/CJS 规则，依据扩展名、package `type` 和当前文件采用 import 或 require 算法。
- `nodenext` 跟随较新的 Node 行为，适合直接由 Node 运行的项目。
- `bundler` 假设 bundler 处理模块，支持 package exports/imports，同时通常不要求相对 import 写运行时扩展名。

模式必须匹配最终运行环境。编辑器通过 bundler 规则解析成功，不代表 Node 可直接运行。

`esModuleInterop` 调整 CommonJS 互操作的 emit helper 和检查；`allowSyntheticDefaultImports` 主要允许类型层默认导入写法，本身不保证运行时真的有 default export。

`import type` 可在产物中删除纯类型依赖，减少副作用和循环加载；若需要运行时值必须普通 import。`paths` 只告诉 TypeScript 如何解析，默认不会改写产物 specifier，运行时或 bundler也要配置 alias。

`moduleDetection` 决定没有显式 import/export 的文件是否仍按 module 处理，例如结合 package/module 语境或强制模式，能避免旧 script 文件污染全局。
