# 资源与网络错误

script/link/img 等资源 error 通常不冒泡，可在 Window 捕获阶段监听并读取 target 的类型、URL 和页面信息。受隐私限制，不能假设获得所有底层网络原因。

fetch 只在网络/策略失败时 reject，HTTP 404/500 仍 resolve，需要检查 response.ok/status。XHR 要区分 error、timeout、abort 和 load。接口封装统一记录 method、归一化 URL、耗时、status、request ID，不能记录密码/token/body 全量。

Resource Timing 可提供 DNS、连接、TTFB 和传输阶段；跨源详细字段需要 Timing-Allow-Origin。浏览器通常不会向 JS 暴露精确 DNS/TLS 错误。

取消请求不应计为系统失败；offline 只是辅助维度。把客户端 request ID 与服务端响应/trace ID 对齐，才能继续定位。
