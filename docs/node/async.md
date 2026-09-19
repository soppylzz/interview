# 异步编程与错误处理

Node 传统 callback 使用 `(err, value)` 约定；Promise 把完成与失败建模为状态；async/await 提供顺序式写法。`util.promisify` 适合遵循 error-first 且只返回一个主要成功值的 API，特殊签名需要自定义适配。

## Promise 组合

- `all`：全部成功，任一失败就拒绝。
- `allSettled`：收集每项结果。
- `race`：取第一个 settled 结果。
- `any`：取第一个成功，全部失败才拒绝。

一次创建十万个 Promise 是并发洪峰，不等于高效。应用队列、信号量或分批处理限制数据库、网络和内存压力。并发表示任务交错等待，并行表示多个执行单元同时计算。

## 失败、取消与重试

同步代码用 throw/catch，Promise 必须 await/catch，callback 检查 err，EventEmitter 必须处理特殊的 `error` 事件。`uncaughtException` 和 `unhandledRejection` 表示边界失守，通常应记录、停止接流并优雅退出，而不是继续假定状态可靠。

AbortSignal 可贯穿 fetch、支持 signal 的 timer、stream pipeline 和业务函数。超时应触发实际取消。重试只用于暂时性失败，配合指数退避和抖动；非幂等操作需要幂等键或去重，避免一次超时变成多次写入。
