# 从输入 URL 到页面展示

地址栏输入首先由浏览器判断是 URL、搜索词还是历史/书签建议。确定导航后，Browser Process 协调网络、存储和 Renderer Process；以下流程会被缓存、Service Worker、HTTP 版本与连接复用改变。

## 导航链路

1. 解析和规范化 URL，检查 scheme、端口及导航策略。
2. HSTS 等策略可能在发出明文请求前把 HTTP 升级为 HTTPS。
3. 检查 Service Worker、HTTP cache 和现有连接能否满足请求。
4. 需要网络时解析 DNS；浏览器、操作系统、路由器和递归解析器都可能缓存结果。
5. 建立传输连接。HTTP/1.1、HTTP/2 常基于 TCP，HTTPS 再完成 TLS；HTTP/3 基于 QUIC。
6. 发送 HTTP 请求，接收状态、响应头和 body。
7. 处理重定向、认证、下载、MIME、安全策略等结果。
8. 对 HTML 导航，浏览器选择或创建合适 Renderer Process，提交导航并流式传递数据。
9. Renderer 开始解析 HTML；预加载扫描器尽早发现子资源，随后进入样式、布局、绘制和合成。

重定向会产生新的 URL 解析和请求，并受循环次数、安全和凭证规则限制。状态码本身不决定页面一定渲染：`Content-Disposition`、MIME、CSP 或下载处理都会影响结果。

跨站导航常需要不同渲染进程以满足 Site Isolation，但进程分配是 Chromium 实现策略。旧页面在新导航 commit 前仍可能可见；commit 后新 Document 接管标签页。

面试回答应先给出主链，再补充“缓存命中可跳过网络”“连接可复用”“HTML 可边收边解析”，避免把所有导航说成固定串行步骤。
