# Web Worker 与主线程通信

Dedicated Worker 只服务创建它的上下文；Shared Worker 可被同源多个上下文连接；Service Worker 独立于页面，作为 origin 范围的网络代理与后台事件处理者。三者生命周期和可用 API 不同。

Worker 有自己的全局作用域和事件循环，可用 fetch、计时器、部分存储/计算 API，但没有当前页面的 Window 和 DOM，因此不能直接修改元素。

`postMessage` 默认使用 structured clone，能复制循环结构、Map、Blob 等，但大数据复制和序列化有成本。ArrayBuffer、MessagePort 等 transferable 可转移所有权；SharedArrayBuffer 允许共享内存，需要 Atomics，并要求页面满足跨源隔离等安全条件。

图像/音视频计算、大 JSON 解析、压缩、搜索和算法任务适合 Worker。任务很短、频繁来回传大对象或强依赖 DOM 时，启动和通信成本可能超过收益。

消息应包含 id、类型、payload 和错误结构，以便关联请求。主线程监听 error/messageerror，Worker 捕获业务异常；不再使用时调用 `terminate()`，Worker 内也可 `close()`，并清理端口、timer 和资源。
