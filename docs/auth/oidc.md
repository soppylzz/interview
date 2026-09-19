# OpenID Connect

> OIDC 在 OAuth 2.0 之上增加身份层，使 Relying Party 能验证 End-User 身份并获取标准 claims。

## 核心

- OpenID Provider：支持 OIDC 的 Authorization Server。
- Relying Party：依赖认证结果的 Client。
- `scope=openid`：把 OAuth 请求标识为 OIDC 请求。
- ID Token：面向 Client，描述认证事件和用户身份。
- Access Token：面向 Resource Server，授权 API 访问。
- UserInfo Endpoint：使用 access token 获取用户 claims。

Authorization Code Flow 中，浏览器先收到 code，Client 在 Token Endpoint 换取 ID Token、Access Token 和可选 Refresh Token。不要把 Access Token 当登录身份证明，因为其 audience 和格式属于 Resource Server。

## ID Token 验证

至少验证签名、`iss`、`aud`、`exp`、`iat`；多 audience 时检查 `azp`；请求带 nonce 时必须匹配。`sub` 是 issuer 内稳定主体标识，账号主键应使用 `(iss, sub)`，不要只依赖可变化或复用的 email。

Discovery 位于 issuer 的 `/.well-known/openid-configuration`，提供 endpoints、支持能力和 `jwks_uri`。验证方只信任预期 issuer 发现的配置。

## state 与 nonce

- state：Client 在授权请求与回调间关联事务，也可承载 CSRF token。
- nonce：进入 ID Token，关联认证请求与签发结果并降低重放风险。
- PKCE：绑定 code 的发起方和兑换方。

## Interview

OIDC 是认证协议，OAuth 是授权框架；二者常在同一流程中同时完成“登录”和“授权”，但 token 的目的不能混用。
