# CORS、安全边界与跨源隔离

CORS 只决定浏览器是否把跨源响应暴露给脚本，不完成用户认证或资源授权。动态 ACAO 必须匹配 allowlist 并返回 `Vary: Origin`；凭证响应不能使用通配符 origin。

CORP 让资源声明谁可跨源加载；COOP 隔离顶层页面的 browsing context group；COEP 要求跨源子资源明确允许嵌入。组合 COOP/COEP 可获得 cross-origin isolated 环境，启用 SharedArrayBuffer 等能力。

这些策略帮助降低 Spectre 类跨源数据泄漏和 opener 干扰，但会破坏未配置 CORS/CORP 的第三方资源。上线前以 Report-Only/报告端点清点依赖并逐步修复。
