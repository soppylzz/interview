# 浏览器应用中的 OAuth

> 浏览器 JavaScript 不能可靠保密 client secret，因此 SPA 是 public client，应使用 Authorization Code + PKCE。

## 三种架构

| 模型 | Token 所在位置 | 特点 |
| --- | --- | --- |
| Browser-only | 浏览器 | 简单，但 token 暴露给 JS 环境 |
| Token-mediating Backend | 后端持 refresh token，浏览器可获短期 access token | 降低长期凭据暴露 |
| BFF | 后端持全部 OAuth token，浏览器只持 session cookie | 隔离最好，需后端代理 API |

## 回调状态机

跳转前生成 verifier、challenge、state，并把它们和预期 issuer、redirect URI、return URL 绑定到短期事务。回调时先检查 OAuth error、state、issuer，再用一次性 code + verifier 换 token；成功后清理 URL 中参数。

code 应短期、一次性，并绑定 client_id、redirect_uri 和 PKCE challenge。不要在 localStorage 长期保存 verifier/state，也不要接受任意 return URL。

多标签页可通过服务端 session、BroadcastChannel 或 storage event 同步“状态已变化”通知，但每个标签页仍应重新向可信后端确认当前状态。

第三方 Cookie 限制使 iframe silent auth 和部分 front-channel SSO 不可靠。优先使用顶层重定向、refresh rotation 或 BFF，而不是依赖隐藏 iframe。

SDK 可封装协议，但应用仍负责正确配置 issuer、client、redirect URI、scope、路由和错误状态。
