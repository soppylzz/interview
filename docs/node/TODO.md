# Node.js 学习清单

> 用于筛选前端面试中的 Node.js 高频知识点。重点理解 Node.js 的异步运行时、模块系统、流与进程模型，并能解释它适合和不适合的任务。

## 内容边界

- JavaScript Promise、async/await 和语言基础可单独整理；本目录关注它们在 Node.js 运行时中的调度和错误处理。
- TCP、HTTP、TLS 协议原理放在 `docs/network`；本目录关注 Node.js 提供的服务端 API。
- 包管理、构建、发布和 Monorepo 放在 `docs/engineering`。
- 通用 Web 安全与服务端攻防放在 Security 笔记，本目录只保留 Node.js API 的安全使用边界。

## P0：建议优先学习

### 1. Node.js 运行时架构 `runtime.md`

- [ ] Node.js、V8、libuv 分别承担什么职责
- [ ] “Node.js 是单线程的”准确描述了什么，又忽略了什么
- [ ] 一个 JavaScript isolate、主线程、libuv event loop 和 worker pool 的关系
- [ ] 网络 I/O 为什么通常不占用 libuv thread pool
- [ ] 文件系统、`dns.lookup`、部分 crypto 与 zlib 操作为什么可能使用线程池
- [ ] `UV_THREADPOOL_SIZE` 能影响哪些任务，为什么不应盲目调大
- [ ] Node.js 适合 I/O 密集任务，CPU 密集任务为什么会阻塞请求
- [ ] Node.js 中同步 API 对服务端吞吐量有什么影响

### 2. Node.js Event Loop `eventLoop.md`

- [ ] timers、pending callbacks、poll、check、close callbacks 各阶段的职责
- [ ] poll 阶段何时等待 I/O，何时进入 check 或 timers
- [ ] `setTimeout(fn, 0)` 与 `setImmediate()` 的执行顺序为什么取决于调用上下文
- [ ] `process.nextTick()` 队列为什么不属于 event loop phase
- [ ] `process.nextTick()`、Promise microtask、timer、immediate 的执行关系
- [ ] 递归调用 `process.nextTick()` 为什么可能造成 I/O starvation
- [ ] Node 20 前后 timers 调度变化为何可能影响边界顺序题
- [ ] 浏览器 Event Loop 与 Node.js Event Loop 的共同点和差异
- [ ] 为什么计时器表示最早可执行时间，而不是精准执行时间

### 3. CommonJS 与 ES Module `modules.md`

- [ ] CommonJS 的 module wrapper、`module`、`exports`、`require` 是什么
- [ ] `exports` 与 `module.exports` 的引用关系，为什么直接重赋值 `exports` 无效
- [ ] CommonJS 模块首次加载后如何缓存
- [ ] 循环依赖为什么可能得到尚未初始化完成的导出
- [ ] ESM 的静态结构、live binding 与异步加载特征
- [ ] `.js`、`.cjs`、`.mjs` 和 `package.json type` 如何决定模块格式
- [ ] `__dirname`、`__filename` 在 ESM 中如何替代
- [ ] `require()`、静态 `import`、动态 `import()` 的差异
- [ ] CommonJS 与 ESM 互操作时 default、named export 为什么容易出问题
- [ ] top-level await 如何影响模块图加载

### 4. 异步编程与错误处理 `async.md`

- [ ] callback、Promise、async/await 如何表达异步流程
- [ ] error-first callback 约定是什么
- [ ] `util.promisify()` 的作用和适用限制
- [ ] `Promise.all`、`allSettled`、`race`、`any` 如何选择
- [ ] 并发与并行的区别，为什么一次创建大量 Promise 不等于合理并发
- [ ] 如何使用队列、信号量或批处理限制并发
- [ ] 同步异常、Promise rejection、callback error 和 EventEmitter `error` 如何处理
- [ ] `uncaughtException`、`unhandledRejection` 为什么不应被当作常规恢复机制
- [ ] AbortController 如何取消 fetch、timer、stream pipeline 等操作
- [ ] 超时、重试、退避与幂等性如何配合

### 5. Buffer、编码与二进制数据 `buffer.md`

- [ ] Buffer 与 Uint8Array、ArrayBuffer 的关系
- [ ] 字符、Unicode code point、UTF-8 byte 的区别
- [ ] 为什么字符串的 length 不一定等于 UTF-8 字节数
- [ ] `Buffer.alloc()`、`allocUnsafe()`、`from()` 的差异
- [ ] Buffer pool 的基本作用
- [ ] 编码与解码时 utf8、base64、hex 分别表示什么
- [ ] 多字节字符跨 chunk 时为什么需要 StringDecoder 或流式解码
- [ ] Buffer slice/subarray 是否共享底层内存
- [ ] 二进制协议、文件和网络数据为什么不应先无意义地转成字符串

### 6. Stream 与背压 `stream.md`

- [ ] Readable、Writable、Duplex、Transform 四类流
- [ ] chunk、buffer、object mode 分别表示什么
- [ ] flowing mode 与 paused mode 的区别
- [ ] `readable.pipe(writable)` 如何传递数据
- [ ] Writable `write()` 返回 false 表示什么，`drain` 何时触发
- [ ] backpressure 为什么能防止内存无限增长
- [ ] `highWaterMark` 是硬性内存上限吗
- [ ] `pipeline()` 相比手工连续 `pipe()` 如何处理错误和清理
- [ ] Async Iterator 如何消费 Readable Stream
- [ ] Node Stream 与 Web Stream 如何转换

### 7. 文件系统、路径与 URL `fsPathUrl.md`

- [ ] sync、callback、Promise 三套 fs API 的使用场景
- [ ] 读取整个文件与创建文件流的内存差异
- [ ] `path.join()` 与 `path.resolve()` 的区别
- [ ] POSIX 与 Windows 路径差异如何影响跨平台代码
- [ ] `process.cwd()`、`__dirname`、`import.meta.dirname` 表示的目录有何不同
- [ ] file URL 与文件系统路径如何互相转换
- [ ] 文件描述符的打开、使用、关闭生命周期
- [ ] 并发写同一文件为什么可能产生竞态
- [ ] watch API 的跨平台行为为何需要谨慎处理

### 8. HTTP Server 基础 `httpServer.md`

- [ ] `http.createServer()` 的 request、response 对象是什么类型
- [ ] IncomingMessage 为什么是 Readable，ServerResponse 为什么是 Writable
- [ ] 如何读取请求体并限制最大尺寸
- [ ] status code、header 与 body 在何时写入
- [ ] header 发送后为什么不能再修改
- [ ] keep-alive、连接超时、请求超时应如何配置
- [ ] 流式响应相比一次性拼接完整响应的优势
- [ ] 客户端提前断开时服务端如何停止无效工作
- [ ] Node 原生 HTTP API 与 Web Fetch API 的对象模型差异
- [ ] 框架的 middleware、router、body parser 建立在什么基础之上

## P1：高频补充

### 9. EventEmitter `events.md`

- [ ] 发布订阅模型与 EventEmitter 的同步调用特征
- [ ] `on`、`once`、`off`、`emit` 的基本行为
- [ ] listener 添加顺序与 emit 过程中修改监听器的影响
- [ ] `error` 事件为什么需要特殊处理
- [ ] MaxListenersExceededWarning 表示什么，它不一定意味着什么
- [ ] 如何使用 AbortSignal 管理监听器生命周期
- [ ] EventEmitter、Promise、Stream 分别适合表达哪类异步关系

### 10. process 与应用生命周期 `process.md`

- [ ] `process.argv`、`env`、`cwd()`、`exitCode` 的用途
- [ ] 环境变量为什么全部以字符串形式进入进程
- [ ] `beforeExit`、`exit`、signal handler 的区别
- [ ] SIGTERM、SIGINT 与 graceful shutdown
- [ ] 优雅退出时如何停止接收请求、等待在途任务并释放资源
- [ ] 为什么直接调用 `process.exit()` 可能丢失待写出的数据
- [ ] stdout、stderr、stdin 与 TTY 的关系
- [ ] exit code 如何向父进程表达结果

### 11. Worker Threads、Child Process 与 Cluster `parallelism.md`

- [ ] `worker_threads`、`child_process`、`cluster` 的隔离范围和通信方式
- [ ] CPU 密集工作为什么适合 Worker Thread
- [ ] Worker 创建成本为何促使应用使用 worker pool
- [ ] structured clone、Transferable 与 SharedArrayBuffer 的区别
- [ ] `spawn`、`exec`、`execFile`、`fork` 的使用场景
- [ ] `exec` 为什么不适合大量持续输出
- [ ] IPC 消息与 stdin/stdout 管道如何选择
- [ ] cluster 与多实例进程管理、容器水平扩容的关系
- [ ] 如何处理子进程退出、超时和僵尸任务

### 12. 包与依赖解析 `packages.md`

- [ ] `node_modules` 向上查找的基本规则
- [ ] `main`、`exports`、`imports`、`type` 字段分别控制什么
- [ ] conditional exports 如何为 import、require、node、browser 提供不同入口
- [ ] package self-reference 与 subpath exports
- [ ] `exports` 为什么可以封装包的内部文件
- [ ] 双包 hazard 是如何产生的
- [ ] `node:` 前缀为什么能明确引用内置模块
- [ ] symlink、Monorepo 和包管理器布局如何影响模块身份

### 13. 测试与可测试性 `testing.md`

- [ ] 单元测试、集成测试和端到端测试在 Node 服务中的边界
- [ ] Node Test Runner 的 test、suite、hook、mock 基本能力
- [ ] 如何测试 timer、网络、文件系统和进程相关代码
- [ ] 为什么依赖注入比全局 monkey patch 更利于测试
- [ ] 并行测试中的端口、临时目录和共享状态如何隔离
- [ ] flaky test 常由哪些异步生命周期问题造成
- [ ] coverage 高为什么不等同于测试有效

### 14. 配置、日志与可观测性 `observability.md`

- [ ] 配置默认值、环境变量、密钥和启动参数如何分层
- [ ] 结构化日志为什么比字符串拼接更便于检索
- [ ] 日志级别、request ID、trace ID 应如何使用
- [ ] AsyncLocalStorage 如何传递请求上下文
- [ ] metrics、logs、traces 分别回答什么问题
- [ ] event loop delay、event loop utilization 能反映什么
- [ ] process report、heap snapshot、CPU profile 分别用于什么故障
- [ ] 日志中的 Token、Cookie、个人信息为什么需要脱敏

## P2：有余力再学

### 15. V8 内存与垃圾回收 `memory.md`

- [ ] stack、heap、external memory 和 Buffer memory 的区别
- [ ] 新生代、老生代与分代回收的基本思路
- [ ] minor GC、major GC 对延迟的影响
- [ ] `--max-old-space-size` 改变什么，为什么不能修复内存泄漏
- [ ] heapUsed、heapTotal、rss、external 分别表示什么
- [ ] 如何用 heap snapshot 和 allocation profile 定位泄漏
- [ ] 大对象、频繁分配和长生命周期缓存如何影响 GC

### 16. Async Hooks 与 AsyncLocalStorage `asyncContext.md`

- [ ] 异步资源和 async ID 的基本概念
- [ ] AsyncLocalStorage 如何跨 Promise、timer、I/O 保留上下文
- [ ] 哪些自定义 thenable、callback 封装可能丢失上下文
- [ ] AsyncResource 用于解决什么问题
- [ ] async_hooks 为什么不适合随意在生产环境做重型处理
- [ ] 请求链路追踪如何利用异步上下文

### 17. Node.js 原生 TypeScript 支持 `typescript.md`

- [ ] Node 的 type stripping 与 TypeScript 编译有什么区别
- [ ] 哪些 TypeScript 语法只需擦除，哪些语法需要转换或不受支持
- [ ] 直接运行 `.ts` 时模块格式和文件扩展名如何处理
- [ ] Node 是否执行类型检查
- [ ] tsconfig 中哪些选项不会影响 Node 直接执行源码
- [ ] 何时仍然需要 `tsc`、tsx、swc 或 bundler
- [ ] 不同 Node 版本的支持范围为什么必须查对应版本文档

### 18. 原生扩展与 WASM `native.md`

- [ ] Node-API 解决 V8 ABI 变化中的什么问题
- [ ] native addon 为什么需要编译和平台相关产物
- [ ] node-gyp、prebuild 与安装脚本的基本关系
- [ ] CPU 密集算法使用原生扩展、WASM、Worker Thread 的取舍
- [ ] 原生代码崩溃为何可能终止整个进程
- [ ] 跨平台发布原生依赖需要考虑哪些架构和 libc 差异

## 综合题

- [ ] 写出 `nextTick`、Promise、timer、I/O callback、`setImmediate` 的可能顺序并说明上下文
- [ ] 解释 Node.js 单线程为什么仍能处理大量并发 I/O
- [ ] 分析一个 CPU 密集函数如何阻塞所有请求并给出迁移方案
- [ ] 比较 CommonJS 与 ESM 的加载、缓存、绑定和循环依赖
- [ ] 解释 Writable backpressure，并修复忽略 `write()` 返回值的代码
- [ ] 设计大文件读取、转换、压缩和上传的流式 pipeline
- [ ] 比较 Worker Thread、Child Process、Cluster 和多容器实例
- [ ] 设计 HTTP 服务的超时、取消和 graceful shutdown
- [ ] 排查进程内存持续增长，区分 JS heap、Buffer 和正常缓存
- [ ] 为一次请求串联结构化日志、request ID 和异步上下文
- [ ] 分析 ESM/CJS 包在不同导入方式下返回值不一致的问题
- [ ] 说明 Node 直接执行 TypeScript 的能力边界

## 建议取舍

- 时间较少：完成 P0，重点掌握运行时、Event Loop、模块、Stream 和 HTTP Server。
- 常规准备：完成 P0、P1，并手写一个包含流式处理、错误处理和优雅退出的小服务。
- 深入准备：补充 P2，实际使用 profile 或 heap snapshot 排查一次 CPU 或内存问题。
