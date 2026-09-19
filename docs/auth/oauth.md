# OAuth 2.0

> OAuth 是委托授权框架：用户允许 Client 在限定 scope 内访问 Resource Server，而无需把账号密码交给 Client。

## 角色与端点

| 概念 | 职责 |
| --- | --- |
| Resource Owner | 有权授权资源访问的主体 |
| Client | 请求委托权限的应用 |
| Authorization Server | 完成授权并签发 token |
| Resource Server | 接受 access token、提供受保护资源 |
| Authorization Endpoint | 通过浏览器进行授权交互 |
| Token Endpoint | 后通道用 code 等 grant 换 token |

Authorization Code 是短期、一次性的中间凭据；Access Token 给 Resource Server；Refresh Token 只交给 Authorization Server 换新 token。scope 表示请求的权限范围，最终签发范围可以更小。

## Authorization Code + PKCE

1. Client 生成随机 `code_verifier`，计算 `code_challenge = BASE64URL(SHA256(verifier))`。
2. 浏览器跳转 Authorization Endpoint，携带 client_id、redirect_uri、scope、state、challenge。
3. 用户认证并授权，Authorization Server 把 code 返回严格注册的 redirect URI。
4. Client 向 Token Endpoint 提交 code、redirect_uri、verifier。
5. Server 验证 code 与 challenge 绑定后签发 token。

PKCE 让截获 code 的攻击者因没有 verifier 而无法兑换。它不是 confidential client 身份认证；SPA/原生应用中的 secret 可被提取，因此属于 public client。

`state` 关联浏览器发起与回调事务；PKCE 绑定授权请求与 token 请求；OIDC `nonce` 绑定认证请求与 ID Token，三者保护边界不同。

## Grant 选择

- Authorization Code + PKCE：有用户参与的浏览器/原生应用首选。
- Client Credentials：服务以自身身份访问资源，不代表用户。
- Refresh Token：延续授权并获得短期 access token。
- Implicit、Resource Owner Password Credentials：当前安全实践不推荐。

OAuth 本身不定义用户身份登录。需要标准身份信息时使用 OIDC。OAuth 2.1 截至当前仍是草案，应以 OAuth 2.0 已发布 RFC 与安全 BCP 实施。

## Interview

### 为什么 redirect URI 必须精确匹配？

宽松前缀或通配匹配可能把 code/token 导向攻击者可控地址。除原生 localhost 端口等规范例外，应使用已注册 URI 的精确字符串匹配。
