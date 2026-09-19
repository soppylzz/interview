# CSP 与 Trusted Types

CSP 通过响应头限制脚本、样式、连接、frame 等来源，是 XSS/注入的纵深防御，不会修复危险数据流。

从 `Content-Security-Policy-Report-Only` 收集违规开始，清理 inline/eval 和第三方依赖，再强制执行。script-src 使用每响应随机 nonce 或静态资源 hash；strict-dynamic 可让受信脚本加载的脚本继承信任，需验证浏览器策略。

default-src 是未单独指定类型的 fallback；connect-src 控制 fetch/WebSocket；frame-ancestors 控制谁能嵌入页面。`unsafe-inline/unsafe-eval` 会显著削弱策略。

Trusted Types 要求高风险 DOM sink 接收 TrustedHTML 等受控值，把 sanitizer 集中到 policy。它不能验证业务 URL/权限。CSP report 可能包含敏感 URL，应采样、脱敏和防滥用。
