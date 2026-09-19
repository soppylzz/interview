# PAR、JAR 与 JARM

> 这些扩展分别保护授权请求的提交、内容和授权响应，常用于金融等高保证场景。

- PAR：Client 先通过后通道把授权参数推送到 Authorization Server，得到短期 request_uri；浏览器前通道只携带引用，减少篡改和泄漏。
- JAR：把 authorization request 表达为签名/加密 JWT，使参数来源和完整性可验证。
- JARM：把 authorization response 包装为签名/加密 JWT，保护 code、state、issuer 等返回参数。

它们可组合：JAR 生成受保护 request，PAR 通过后通道提交，JARM 保护返回。使用后仍需 PKCE、严格 redirect URI、issuer/audience/time 验证，不能认为“JWT 化”自动安全。

FAPI Profile 规定一组 OAuth/OIDC 扩展、算法和验证约束，以提高不同高安全实现的互操作性。普通应用不应无需求堆叠全部扩展。
