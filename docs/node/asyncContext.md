# Async Hooks 与 AsyncLocalStorage

Node 把 timer、Promise、socket 等异步操作表示为资源，每个资源有 async ID 和触发它的 trigger ID。`async_hooks` 能观察资源初始化、执行前后和销毁，但逐事件重型处理会增加明显开销。

AsyncLocalStorage 在这些异步关系上维护 store，适合传递 request ID、trace span 和租户上下文：

```js
const storage = new AsyncLocalStorage()

server.on('request', (req, res) => {
  storage.run({ requestId: crypto.randomUUID() }, () => handle(req, res))
})
```

标准 Promise、timer 和多数 Node I/O 会保留上下文。自行实现的 thenable、把 callback 存到未被追踪的原生/第三方调度器，或在错误作用域绑定函数，可能造成丢失。

AsyncResource 可为自定义异步边界创建资源，并在正确 execution context 中调用回调。排查时先在边界前后打印 store，再把第三方 callback 用 AsyncResource 或绑定 API 包装。

链路追踪通常在请求入口创建上下文，下游日志与客户端调用读取并传播 trace 信息，结束时关闭 span。上下文只用于关联信息，不应替代显式的授权参数或业务状态。
