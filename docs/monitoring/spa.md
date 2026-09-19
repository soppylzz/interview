# SPA 路由与生命周期监控

首次 navigation 有浏览器 Navigation Timing；pushState/replaceState/popstate 的软导航需由路由器或 Navigation API 信号自定义起点和完成条件。

路由完成不能只看 URL 改变，还要定义关键数据和内容何时可用。记录 from/to、navigation id、加载耗时、取消和错误，快速连续导航要结束旧 span。

页面停留时间结合 visibilitychange/pagehide，排除后台时间。BFCache pageshow persisted 恢复旧文档，可能继续原 session 或建立新 view，需要统一产品口径。

错误率、白屏和性能应按 route template 聚合，避免把动态 id 当高基数路径。
