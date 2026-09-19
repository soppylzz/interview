# Observer API

Observer 把变化批量通知给应用，通常比 timer 轮询或每帧读取布局更省工作，但 callback 仍需保持轻量并在不用时 disconnect。

## MutationObserver

观察 DOM 子树、属性和文本变化。变更记录在 microtask checkpoint 附近批量交付，适合监听第三方 DOM、编辑器和自定义元素，不用于监听 CSS 布局尺寸。callback 自己修改被观察 DOM 时要防止反馈循环。

## IntersectionObserver

异步观察目标与 root 视口的交叉状态。`root` 指定滚动容器，`rootMargin` 提前或延后边界，`threshold` 指定交叉比例阈值。适合懒加载、曝光统计和无限滚动，但不是像素级实时碰撞检测。

## ResizeObserver

观察元素 content/border/device-pixel 等 box 尺寸变化，适合容器自适应、图表重绘。callback 中再次改变尺寸可能形成 resize loop；浏览器会限制并报告未交付通知，应把写入安排到后续帧或避免自反馈。

DOM 结构变化选 MutationObserver，进入视口选 IntersectionObserver，元素尺寸变化选 ResizeObserver。选择依据是信号本身，不是哪个 API 看起来更“异步”。
