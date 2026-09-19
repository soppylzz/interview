# 路由与页面架构

Route tree 同时表达 URL、布局和数据边界。URL 应保存可分享/可恢复的搜索、分页、选中项等状态，短暂视觉状态留本地。

loader 在进入页面前/中获取数据，guard 做导航条件，redirect 规范化路径，error boundary 隔离路由失败。授权最终由服务端保证。

按路由 code split 通常能匹配用户路径；过细会产生瀑布。导航开始时取消旧 loader，以 navigation id 或 signal 防止旧响应覆盖新页面。

登录回跳要验证 return URL，403 与 404 按泄露策略区分，服务端配置 history fallback 支持深链接。路由级 loading/error/empty 应有一致体验。
