# 安全响应头

HSTS 告诉浏览器在有效期内只用 HTTPS；首次访问保护可结合 preload。`X-Content-Type-Options: nosniff` 防止特定资源类型嗅探。

Referrer-Policy 控制跨导航/请求发送多少来源 URL；Permissions-Policy 限制页面和 iframe 使用摄像头、定位等能力。

CSP 限制内容来源和嵌入，COOP/COEP/CORP 建立跨源隔离。X-Frame-Options 是 frame-ancestors 的旧兼容补充，旧 X-XSS-Protection 不应作为现代防御核心。

敏感个性化响应需正确 Cache-Control 和 Vary，避免共享缓存泄漏。安全头应按页面用途设计并自动测试，不是复制一份万能清单。
