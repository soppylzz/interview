# Frontend Engineering 学习清单

> 用于筛选前端面试中的工程化知识点。重点理解源码如何经过解析、转换、打包、优化、测试和发布成为可运行产物，而不是记忆某个工具版本的配置项。

## 内容边界

- TypeScript 类型系统与 tsconfig 类型检查放在 `docs/typescript`，本目录关注它在构建链路中的位置。
- Core Web Vitals、资源加载和运行时优化放在 `docs/perf`，本目录关注产物体积与加载策略如何生成。
- Node.js 运行时、Event Loop 和 Stream 放在 `docs/node`；构建工具使用 Node API 的部分放在本目录。
- Vite、Webpack 等工具实现会随版本演进，学习时应先确认当前版本，避免把历史实现当作固定架构。

## P0：建议优先学习

### 1. 前端构建链路 `buildPipeline.md`

- [ ] parser、compiler、transpiler、bundler、minifier 分别解决什么问题
- [ ] 源码从 entry 到最终 assets 通常经历哪些阶段
- [ ] 解析、转换、代码生成为什么是编译工具的常见三阶段
- [ ] loader/transform 与 plugin 的职责通常如何区分
- [ ] 开发服务器与生产构建为什么采用不同策略
- [ ] source file、module、chunk、bundle、asset 分别表示什么
- [ ] 构建时行为与运行时行为如何区分
- [ ] syntax transform 与 API polyfill 为什么是两个问题
- [ ] transpile TypeScript 为什么不等于执行类型检查

### 2. JavaScript 模块与模块图 `moduleGraph.md`

- [ ] ESM 的静态 import/export 为什么便于分析依赖图
- [ ] CommonJS 的动态 `require` 为什么更难静态分析
- [ ] entry、dependency、importer、dynamic import 如何形成 module graph
- [ ] bare import、relative import、absolute URL 如何解析
- [ ] package `exports`、`imports`、`main`、`module`、`browser` 字段的作用边界
- [ ] conditional exports 如何为不同环境提供入口
- [ ] 循环依赖在 ESM 与 CommonJS 中的表现差异
- [ ] external dependency 表示什么，应用构建与库构建为何采用不同策略
- [ ] alias 为什么需要在 bundler、TypeScript、测试工具中保持一致

### 3. Vite `vite.md`

- [ ] Vite dev server 为什么基于浏览器原生 ESM 按需提供模块
- [ ] 浏览器不能直接解析 bare import，Vite 如何重写为可请求 URL
- [ ] 依赖预构建为什么需要处理 CommonJS/UMD 兼容与过碎 ESM
- [ ] 源码按需转换与传统 bundle-first dev server 的区别
- [ ] Vite 如何维护 module graph
- [ ] HMR update 如何通过依赖边界避免整页刷新
- [ ] React Fast Refresh 与通用 HMR 有何区别
- [ ] `import.meta.env`、mode、`.env` 文件如何参与构建
- [ ] 只有特定前缀变量能暴露给客户端的原因
- [ ] Vite Plugin API 与 Rollup-compatible hooks 的关系
- [ ] `resolveId`、`load`、`transform` 等核心 hook 如何协作
- [ ] virtual module 如何由插件生成
- [ ] 当前 Vite 使用 Rolldown 的位置，以及历史版本中 esbuild/Rollup 的职责
- [ ] 开发与生产行为不一致时如何判断是浏览器 ESM、插件还是 bundling 差异

### 4. Babel `babel.md`

- [ ] Babel 是 JavaScript compiler，它能转换什么、不能保证什么
- [ ] parse、transform、generate 三个阶段
- [ ] `@babel/parser`、traverse、types、generator 分别负责什么
- [ ] syntax plugin 与 transform plugin 的区别
- [ ] plugin 与 preset 的关系
- [ ] plugin 顺序和 preset 逆序执行为什么会影响结果
- [ ] `@babel/preset-env` 如何结合 targets/Browserslist 选择转换
- [ ] `useBuiltIns`、core-js、`@babel/plugin-transform-runtime` 的区别
- [ ] Babel 转译 TypeScript 为什么只移除类型、不执行类型检查
- [ ] loose/assumptions 模式为什么会改变产物语义或体积
- [ ] Babel 配置文件的项目级、文件相对配置与 Monorepo 查找边界
- [ ] Babel cache 应基于哪些输入失效

### 5. AST `ast.md`

- [ ] token、CST、AST 的区别
- [ ] lexer/tokenizer 与 parser 分别做什么
- [ ] Program、Statement、Expression、Declaration 等节点层级
- [ ] Identifier 的相同文本为什么不代表引用同一个 binding
- [ ] AST traversal 中 visitor enter/exit 的执行时机
- [ ] Node、NodePath、Scope、Binding 在 Babel 中的关系
- [ ] 如何识别变量声明、引用和作用域遮蔽
- [ ] 如何创建、替换、删除节点并保持 AST 合法
- [ ] code generator 为什么无法天然还原原始空格和换行
- [ ] source location 与 source map 如何把生成代码映射回源码
- [ ] ESTree、Babel AST、TypeScript AST 为什么存在结构差异
- [ ] codemod、lint rule、compiler transform 分别如何使用 AST

### 6. Bundler 原理 `bundler.md`

- [ ] bundler 如何从 entry 解析并遍历依赖图
- [ ] resolve、load、parse、transform、link、render、emit 的基本流程
- [ ] 静态依赖和动态依赖如何形成不同 chunk
- [ ] scope hoisting/module concatenation 解决什么问题
- [ ] runtime module 为什么负责加载异步 chunk
- [ ] content hash 应由哪些内容决定
- [ ] chunk graph 与 module graph 有何区别
- [ ] 构建缓存的 key 为什么需要包含源码、配置、插件和环境信息
- [ ] watch mode 如何根据文件变化做增量失效
- [ ] bundler 如何处理 CSS、图片、WASM 等非 JavaScript 资源

### 7. Tree Shaking 与 Code Splitting `optimization.md`

- [ ] Tree Shaking 为什么依赖 ESM 的静态结构
- [ ] mark-and-sweep 在 dead code elimination 中的基本思路
- [ ] export 未使用为什么不代表模块可以整体删除
- [ ] 顶层副作用如何阻止模块裁剪
- [ ] package.json `sideEffects` 的作用及错误配置风险
- [ ] dynamic import 如何成为 split point
- [ ] route-level、component-level、vendor splitting 的取舍
- [ ] chunk 太大和 chunk 太碎分别有什么问题
- [ ] shared chunk 如何避免重复代码，又可能造成哪些额外依赖
- [ ] minify、mangle、compress 分别做什么
- [ ] gzip/Brotli 体积与原始 bundle size 为什么需要同时观察

### 8. Webpack `webpack.md`

- [ ] entry、output、module、loader、plugin、mode 的职责
- [ ] loader chain 的执行顺序和 pitch 阶段
- [ ] plugin 如何通过 Tapable hooks 介入 compiler/compilation 生命周期
- [ ] Compiler 与 Compilation 的区别
- [ ] Webpack 如何构建 module graph 和 chunk graph
- [ ] runtime、manifest、chunk 分别包含什么
- [ ] `import()`、SplitChunksPlugin 与 runtimeChunk 的作用
- [ ] HMR runtime 如何下载 update manifest 与 hot-update chunk
- [ ] filesystem cache 如何判断失效
- [ ] loader 与 plugin 分别适合转换单文件还是控制整体构建
- [ ] Webpack、Vite 的开发模式差异不应简单概括为“一个快、一个慢”

### 9. npm 包与 SemVer `packageBasics.md`

- [ ] `dependencies`、`devDependencies`、`peerDependencies`、`optionalDependencies` 的区别
- [ ] SemVer 中 major、minor、patch 表示什么
- [ ] `^`、`~`、精确版本和 range 如何匹配版本
- [ ] prerelease 版本如何参与范围匹配
- [ ] package-lock、pnpm-lock、yarn.lock 为什么需要提交
- [ ] lockfile 与 package.json 分别声明什么
- [ ] npm script 如何查找 `node_modules/.bin`
- [ ] lifecycle script 的运行时机和供应链风险
- [ ] package `files`、`.npmignore`、publishConfig 如何控制发布内容

## P1：高频补充

### 10. 浏览器兼容与 Polyfill `compatibility.md`

- [ ] Browserslist 如何成为 Babel、Autoprefixer 等工具的共同 targets
- [ ] 语法兼容、Web API 兼容、CSS 兼容分别由什么处理
- [ ] transform 与 polyfill 的区别
- [ ] core-js 的 entry usage 与 usage-based 注入思路
- [ ] feature detection 为什么通常优于 UA sniffing
- [ ] differential serving 的基本思路
- [ ] modern build 与 legacy build 的体积和维护成本
- [ ] transpile dependency 何时是必要的

### 11. Rollup、Rolldown、esbuild、SWC 与 Oxc `toolchain.md`

- [ ] Rollup 的 ESM-first 与插件模型特点
- [ ] Rolldown 为什么强调 Rollup-compatible API 与原生实现
- [ ] esbuild、SWC、Oxc 分别覆盖解析、转换、压缩、lint 或 bundling 的哪些部分
- [ ] 原生语言实现为什么通常更快，但不自动保证构建语义相同
- [ ] Babel 丰富生态与新工具速度优势如何取舍
- [ ] 应用 bundling 与 library bundling 对工具能力的不同要求
- [ ] 为什么不能仅根据 benchmark 选择构建工具
- [ ] 项目框架、插件兼容、source map、调试能力如何影响选择

### 12. 包管理器与依赖布局 `packageManager.md`

- [ ] npm、pnpm、Yarn 的依赖安装和磁盘布局差异
- [ ] npm/yarn classic 的 hoisting 为什么可能产生幽灵依赖
- [ ] pnpm content-addressable store 与 symlink 结构
- [ ] peer dependency 为什么由消费方提供
- [ ] peer dependency 冲突如何产生
- [ ] overrides/resolutions 用于解决什么问题
- [ ] frozen lockfile 为什么适合 CI
- [ ] workspace protocol 和本地包链接
- [ ] 安装脚本、锁文件污染和依赖投毒应如何防范

### 13. Library 构建与发布 `library.md`

- [ ] 应用构建和库构建在 external、产物格式和兼容目标上的区别
- [ ] ESM-only、CommonJS-only、dual package 如何选择
- [ ] package `exports` 如何声明主入口、子路径和条件入口
- [ ] `types`、typesVersions 和 declaration map 的作用
- [ ] 为什么 JavaScript 入口和 `.d.ts` 入口必须保持一致
- [ ] CSS、图片、WASM 等资源应内联、复制还是交给消费方处理
- [ ] `sideEffects` 如何帮助消费者 Tree Shake
- [ ] dual package hazard 与模块单例重复问题
- [ ] npm pack/dry-run 如何检查最终发布内容
- [ ] 如何验证包能被 Node、bundler 和 TypeScript 正确消费

### 14. Monorepo `monorepo.md`

- [ ] Monorepo 与 Multirepo 的优缺点
- [ ] workspace 如何管理本地包与统一安装
- [ ] task graph 与 package dependency graph 的关系
- [ ] affected build/test 如何只执行受影响任务
- [ ] 本地缓存与远程缓存的 cache key 设计
- [ ] source dependency 与 built package dependency 两种开发方式
- [ ] TypeScript project references 如何减少重复检查
- [ ] 版本统一发布与独立发布的取舍
- [ ] pnpm workspace、Nx、Turborepo 等工具分别解决哪层问题

### 15. Lint、Format 与类型检查 `codeQuality.md`

- [ ] ESLint、Prettier、TypeScript 分别负责什么
- [ ] syntax error、type error、lint error、format difference 的区别
- [ ] type-aware lint 为什么更慢，它能发现哪些额外问题
- [ ] flat config 的配置与作用范围
- [ ] parser、plugin、rule、config/preset 的关系
- [ ] Prettier 为什么不应承担代码质量规则
- [ ] pre-commit hook、lint-staged 与 CI 检查如何分工
- [ ] 自动修复为何仍需在 CI 中验证

### 16. 测试工程 `testing.md`

- [ ] 单元、组件、集成、E2E 测试的边界
- [ ] 测试金字塔是否适合所有前端项目
- [ ] jsdom/happy-dom 与真实浏览器环境的差异
- [ ] mock、stub、spy、fake 的区别
- [ ] module mock 为什么受 ESM/CJS 加载时机影响
- [ ] fake timer 如何影响微任务与异步测试
- [ ] snapshot 测试适合验证什么，不适合验证什么
- [ ] coverage 的 statement、branch、function、line 指标
- [ ] flaky test 的常见来源和治理方式
- [ ] Vitest/Jest 与 Playwright/Cypress 分别位于哪一层

### 17. Source Map 与线上定位 `sourceMap.md`

- [ ] generated position 如何映射到 original position
- [ ] source map 中 sources、names、mappings、sourcesContent 的作用
- [ ] VLQ 编码为何适合压缩映射信息
- [ ] inline、external、hidden source map 的区别
- [ ] 生产环境是否公开 source map 的取舍
- [ ] 错误监控平台如何通过 release 和 artifact 还原堆栈
- [ ] 代码分割后如何为每个 chunk 上传正确 source map
- [ ] source map 不匹配为何会把错误定位到错误版本

### 18. CI/CD 与环境管理 `cicd.md`

- [ ] install、lint、typecheck、test、build、deploy 的基本流水线
- [ ] CI 为什么应使用锁文件和可复现安装
- [ ] build once deploy many 与按环境重新构建的取舍
- [ ] build-time env 与 runtime config 的区别
- [ ] 为什么客户端环境变量不能保存秘密
- [ ] artifact、cache、deployment 分别是什么
- [ ] 蓝绿、滚动、金丝雀发布的基本区别
- [ ] 静态资源先发布还是 HTML 先发布，如何避免 chunk 404
- [ ] health check、smoke test、rollback 如何形成发布闭环

## P2：有余力再学

### 19. 编写 Babel 插件与 Codemod `babelPlugin.md`

- [ ] 如何确定目标语法对应的 AST 节点
- [ ] visitor 如何匹配节点并获取 NodePath
- [ ] scope/binding 如何避免错误重命名遮蔽变量
- [ ] 如何用 `@babel/types` 创建和校验节点
- [ ] 插件的 pre、visitor、post 生命周期
- [ ] 插件状态和 options 如何传递
- [ ] 如何保证 transform 幂等并保留语义
- [ ] codemod 如何处理无法自动迁移的情况
- [ ] fixture、snapshot 和 round-trip 测试如何验证转换

### 20. 编写 Vite/Rollup 插件 `vitePlugin.md`

- [ ] config、configResolved、configureServer 等 Vite-specific hook
- [ ] resolveId、load、transform 如何组成虚拟模块插件
- [ ] transform hook 为什么应返回 code 与 map
- [ ] buildStart、generateBundle、writeBundle 的使用场景
- [ ] enforce pre/post 如何影响插件顺序
- [ ] `apply` 如何区分 serve 与 build
- [ ] HMR hook 如何发送精确更新或自定义事件
- [ ] 插件缓存、watch file 和构建失效如何处理
- [ ] 为什么兼容 Rollup hook 不代表开发和构建行为完全一致

### 21. Bundler 实现练习 `miniBundler.md`

- [ ] 从 entry 开始解析 import 并建立 module graph
- [ ] 如何分配 module ID 并处理循环依赖
- [ ] 如何把 ESM import/export 转成简单运行时模块格式
- [ ] 如何生成 module cache 和 require runtime
- [ ] dynamic import 如何形成 chunk graph
- [ ] chunk 文件名、content hash 和 manifest 如何生成
- [ ] loader/plugin hook 如何设计
- [ ] 如何生成最小 source map
- [ ] 这个练习与生产 bundler 在语义和边界上还差什么

### 22. 微前端工程 `microFrontend.md`

- [ ] 微前端解决的是组织、部署还是运行时技术问题
- [ ] iframe、运行时集成、构建时集成、Web Components 的取舍
- [ ] Module Federation 的 host、remote、shared dependency 概念
- [ ] shared singleton 和版本冲突如何处理
- [ ] 样式、全局变量、路由和事件如何隔离
- [ ] 独立部署与整体一致性如何权衡
- [ ] 微前端的运行时开销和调试复杂度
- [ ] 什么规模和组织下不值得引入微前端

## 综合题

- [ ] 从源码入口开始画出 parse、transform、bundle、minify、emit 的完整链路
- [ ] 解释 Vite 首次启动、依赖预构建、按需转换和 HMR 更新过程
- [ ] 用 AST 说明一个 Babel 插件如何把箭头函数或 API 调用转换成目标代码
- [ ] 解释 Tree Shaking 为什么可能失败，并用证据验证是哪项副作用阻止删除
- [ ] 比较 Vite 与 Webpack 的开发模式、插件生态和生产构建
- [ ] 设计 route-level Code Splitting，同时避免 chunk 过碎和共享依赖重复
- [ ] 分析 ESM/CJS 双包在 Node 与 bundler 中出现不同实例的问题
- [ ] 为一个 TypeScript 库设计 exports、types、产物格式和发布验证
- [ ] 分析 path alias 在编辑器正常、运行时失败的原因
- [ ] 设计 Monorepo 的任务依赖、增量执行和远程缓存
- [ ] 设计包含 lint、typecheck、test、build、部署和回滚的 CI/CD
- [ ] 根据 source map 和 release 信息还原一次线上压缩代码异常
- [ ] 比较 Babel、SWC、esbuild、Oxc、Rollup、Rolldown 各自在工具链的位置
- [ ] 解释开发构建正常、生产构建失败时应如何逐层排查

## 建议取舍

- 时间较少：完成 P0，重点掌握构建链路、模块图、Vite、Babel、AST、Tree Shaking。
- 常规准备：完成 P0、P1，并手写一个简单 Babel 插件或 Vite 虚拟模块插件。
- 深入准备：补充 P2，完成 mini bundler 或真实 Library 发布流程，不必背诵工具的全部配置项。
