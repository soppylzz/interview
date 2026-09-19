# 页面生命周期

`document.readyState` 通常从 `loading` 变为 `interactive`，再到 `complete`。DOMContentLoaded 大致对应 DOM 可用和 defer/module 完成；load 表示文档及多数依赖加载完成。

`pageshow/pagehide` 既用于普通显示/离开，也用于 BFCache 恢复/保存；事件的 `persisted` 可区分 BFCache。`visibilitychange` 表示页面可见性变化，是保存轻量状态和停止非必要工作的常用信号。

`beforeunload` 只适合有未保存用户修改时提示，浏览器会限制自定义文本；长期注册还可能影响 BFCache。`unload` 在移动端和进程终止时不可靠，也会妨碍页面缓存，不应用于关键上报。

页面进入后台后，timer 会被节流，`requestAnimationFrame` 通常暂停，网络和 CPU 可能受预算限制。页面还可能被冻结，停止可冻结任务；内存压力下可被丢弃，恢复时相当于重新加载。

应用应在 visibility/pagehide 时保存可恢复状态，在 pageshow 时重新校验时间敏感数据和连接。`navigator.sendBeacon()` 适合页面结束时发送少量无需读取响应的分析数据；需要自定义方法/响应时可考虑 keepalive fetch，但二者都不是绝对送达保证。
