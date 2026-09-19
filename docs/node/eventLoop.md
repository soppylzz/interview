# Node.js Event Loop

libuv 的主要阶段可概括为 timers、pending callbacks、poll、check、close callbacks。poll 获取 I/O 事件，并在没有立即工作时按计时器等条件等待；`setImmediate` 在 check 阶段执行。

## 队列关系

`process.nextTick` 队列不属于 libuv phase。每次 JavaScript 回调结束后，Node 会先清空 nextTick，再处理 Promise 等微任务，然后继续事件循环。递归 nextTick 可长期阻止 I/O，形成 starvation。

```js
setTimeout(() => console.log('timer'), 0)
setImmediate(() => console.log('immediate'))
```

在顶层，两者顺序受调度时机影响；在 I/O callback 中，通常会先到 check 阶段执行 immediate。计时器的 delay 只是最早可执行时间，主线程繁忙时一定会推迟。

Node 20 随 libuv 调整了 timers 在 poll 周围的运行时机，边界顺序题必须说明 Node 版本，不能把某次实验结果当规范保证。

浏览器与 Node 都有任务和微任务概念，但 Node 有 libuv phases、nextTick 和服务端 I/O；浏览器还有渲染机会。回答顺序题时先写调用上下文、版本和各回调进入的队列，再推导可能顺序。
