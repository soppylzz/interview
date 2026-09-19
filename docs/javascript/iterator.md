# 迭代器与生成器

iterable 实现 `[Symbol.iterator]()`，返回具有 `next()` 的 iterator；next 返回 `{ value, done }`。`for...of`、展开、Array.from 等消费这一协议。

generator function 调用时不立即执行，返回 generator。每次 next 恢复到下一个 yield；`return` 请求结束，`throw` 在暂停点抛错，`yield*` 委托另一个 iterable。

若 for...of 因 break/throw 提前退出，会尝试调用 iterator.return 完成清理。自定义 iterator 管理文件或锁时应实现关闭路径。

async iterable 实现 `Symbol.asyncIterator`，next 返回 Promise；`for await...of` 逐项等待。它适合流式分页和异步数据源，但循环天然串行，若元素可独立并发需另行设计。
