# Promise 与 async/await

Promise 只有 pending、fulfilled、rejected 三种状态，一旦 settled 不再改变。resolve 另一个 Promise/thenable 时会采用其最终状态，而不是简单把它当普通值。

`then` 总返回新 Promise：callback 返回值兑现它，抛错拒绝它，返回 Promise 则等待。缺失的 fulfillment/rejection handler 会发生值穿透或错误继续传播；finally 不改变结果，除非自己抛错或返回 rejected Promise。

`all` 保序并 fail-fast；`allSettled` 收集全部结果；`race` 取首个 settled；`any` 取首个 fulfilled，全部拒绝时产生 AggregateError。它们不会自动取消其他任务。

async 函数始终返回 Promise。await 暂停当前 async 函数，后续通过微任务继续，不阻塞线程。先创建多个 Promise 再一起 await 才是并发；循环中逐个 await 是串行。

大量并发需要队列/信号量限制，并用 AbortSignal 取消底层工作。没有及时处理的 rejection 可能触发 unhandledrejection，不能依赖全局监听替代局部错误策略。
