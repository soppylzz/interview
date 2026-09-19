# OAuth 安全实践

> 当前实现应遵循 OAuth Security BCP：Authorization Code + PKCE、严格 redirect URI、避免 token 出现在前通道 URL，并验证 issuer 和事务绑定。

## 常见威胁

- Code interception：攻击者截获 code；PKCE 让其无法兑换。
- Code injection：把攻击者 code 注入受害者回调；PKCE/nonce 和事务绑定用于检测。
- CSRF/login CSRF：回调未关联原浏览器事务；使用 PKCE、state 或 OIDC nonce 等规范允许的绑定机制。
- Mix-up：Client 混淆不同 Authorization Server；验证 issuer 并绑定 endpoints。
- Open redirect：宽松 redirect/跳转参数泄漏 code/token。
- Token leakage：URL、日志、Referer、错误监控或前端存储暴露 token。

Authorization response 和 token response 中的 code/token 不应写入普通日志。Redirect URI 精确匹配，授权服务器和 Client 都不应提供任意跳转 open redirector。

Refresh token 使用 rotation；高风险场景可使用 DPoP 或 mTLS 将 access token 绑定发送方。Authorization Server Metadata 降低 endpoint 配错和 issuer 混淆。

Implicit 把 access token 暴露在浏览器前通道，无法获得 PKCE 对 code 兑换的保护，当前不推荐。
