# JavaScript 与主线程

下载体积只是 JavaScript 成本之一，解析、编译和执行也会占用主线程。超过约一帧预算的任务会造成掉帧，Long Task 还会延迟输入回调和渲染机会。

一次交互延迟可分为输入延迟、处理时间和展示延迟。先在 Performance trace 中判断慢在哪一段，再优化监听器、状态更新或渲染。

## 让出主线程

把大循环拆成可恢复的小批次，并在批次间使用 `scheduler.yield()` 等机制让浏览器处理更高优先级工作。`requestAnimationFrame` 适合下一次视觉更新前的 DOM 写入；`requestIdleCallback` 只适合允许长期推迟的低优先级任务，且应考虑超时和兼容性。

Promise 微任务会在浏览器进入下一任务和渲染前持续清空，大量递归微任务也能饿死渲染，不能把代码换成 Promise 就视为让出主线程。

Web Worker 适合图像处理、解析、搜索等纯 CPU 工作，不能直接操作 DOM。结构化克隆有序列化和复制成本，大 ArrayBuffer 可 transfer 所有权；应批量消息，并把通信成本计入优化结果。
