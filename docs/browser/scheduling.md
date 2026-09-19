# 浏览器调度 API

`requestAnimationFrame` 在预计下一次绘制前调用，适合读取时间并更新视觉状态；后台页面通常暂停。`setTimeout` 只保证最早可运行时间，不与刷新率同步。

`requestIdleCallback` 在浏览器判断有空闲预算时运行，`IdleDeadline.timeRemaining()` 表示本次可用时间，timeout 可避免无限等待，但超时任务仍可能增加卡顿。它并非所有主流环境都同等支持，关键工作不能依赖它完成；可降级为分批 timer/postTask。

`queueMicrotask` 直接排 microtask，异常按普通异常报告；`Promise.then` 也排 microtask，但 callback 抛错变成 rejection。两者都会在渲染机会前清空，递归使用会造成饥饿。

Scheduler API 的 `scheduler.postTask()` 可表达 user-blocking、user-visible、background 等优先级，`scheduler.yield()` 可在长任务中让出主线程并延续任务优先级。使用前做特性检测，为不支持环境提供 timer/MessageChannel 等降级。

动画用 rAF；一次普通异步工作用 task；必须紧随当前同步状态的少量收尾用 microtask；可延迟工作用低优先级 postTask/idle。长循环按时间预算切片，每片之间调度 task，不能用 microtask 伪装让步。后台页面的 timer、rAF、idle 和任务预算都可能被限制。
