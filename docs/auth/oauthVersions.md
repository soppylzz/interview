# OAuth 1.0、OAuth 2.0 与 OAuth 2.1

> 版本比较应关注安全模型和生态，不要把 OAuth 2.1 草案描述成已正式取代 OAuth 2.0 的 RFC。

OAuth 1.0 要求客户端对请求签名，协议与规范化过程较复杂；OAuth 2.0 主要使用 TLS 保护传输，并广泛采用 Bearer Token，同时通过 grant 和扩展适配不同 Client。

OAuth 2.0 是框架，PKCE、metadata、revocation、introspection、device flow、DPoP 等能力由独立 RFC 扩展。实施时必须同时参考安全 BCP，而不是只看 2012 年核心 RFC。

OAuth 2.1 草案整合当前实践：默认 Authorization Code + PKCE、严格 redirect URI，省略 Implicit 和 Password Grant，并收拢多个 OAuth 2.0 更新。但 Internet-Draft 可继续变化，项目依据应是已发布的 OAuth 2.0 RFC、RFC 9700 等 BCP 和适用扩展。

面试可回答：“OAuth 2.1 是对 OAuth 2.0 现代安全实践的整合方向；当前生产实现不等待它，而是直接遵守已经发布的 BCP。”
