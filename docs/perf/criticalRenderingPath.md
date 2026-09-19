# 关键渲染路径

浏览器解析 HTML 构建 DOM，解析 CSS 构建样式信息，并结合它们布局和绘制。CSS 通常阻塞首次渲染；JavaScript 若在解析过程中执行，还可能阻塞 HTML 解析并等待先前 CSS。

## Script 与资源提示

- 普通 script 下载和执行会阻塞 parser。
- `defer` 并行下载、文档解析后按序执行。
- `async` 并行下载，完成即执行，顺序不保证。
- module 默认具有类似 defer 的加载行为，并递归加载模块图。

关键 CSS 是首屏渲染所需最小集合，非关键样式可延后，但拆分过度会造成闪烁和维护成本。

`preload` 提前取当前导航必需资源；`modulepreload` 预取模块及相关处理；`preconnect` 提前建连；`dns-prefetch` 只做解析；`prefetch` 面向未来低优先级导航。`fetchpriority` 是优先级提示，不是强制保证。

错误 preload 会重复下载或抢占真正关键资源，过多 high priority 会让优先级失去意义。Network waterfall 中，关键资源若很晚才开始通常是发现问题；前一请求完成后下一请求才出现说明存在串行关键链。优化目标是缩短链路和提前发现，不只是减少请求个数。
