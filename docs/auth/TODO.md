# OAuth 学习清单

> 用于筛选前端面试中的认证、授权与 OAuth 高频知识点。重点是分清协议职责、理解 Authorization Code + PKCE 流程，并能解释浏览器应用如何安全地维护登录状态。

## 已安排

### OAuth 2.0 `oauth.md`

- [ ] Authentication 与 Authorization 的区别
- [ ] Resource Owner、Client、Authorization Server、Resource Server 四个角色
- [ ] Authorization Endpoint、Token Endpoint、Redirect URI 分别承担什么职责
- [ ] Authorization Grant、Authorization Code、Access Token、Refresh Token 的区别
- [ ] scope 表示什么，用户同意的权限与最终签发的权限为什么可能不同
- [ ] public client 与 confidential client 的区别
- [ ] SPA 和原生应用为什么不能可靠保存 `client_secret`
- [ ] Authorization Code 流程中浏览器、客户端、授权服务器和资源服务器如何交互
- [ ] PKCE 中 `code_verifier`、`code_challenge`、`S256` 的生成和校验过程
- [ ] PKCE 防止什么攻击，为什么不能把它简单理解成客户端认证
- [ ] `state`、PKCE、OIDC `nonce` 分别关联和保护什么
- [ ] Redirect URI 为什么需要精确匹配
- [ ] Client Credentials 适合哪种机器间授权场景
- [ ] Refresh Token Grant 如何换取新令牌
- [ ] Implicit Grant 和 Resource Owner Password Credentials 为什么不再推荐
- [ ] OAuth 2.0 为什么是授权框架，而不是登录协议
- [ ] OAuth 2.1 当前仍是草案，它相对 OAuth 2.0 汇总了哪些安全实践

### JWT `jwt.md`

- [ ] JWT 是令牌格式，不是认证或授权协议
- [ ] 常见的 JWS Compact JWT 如何由 JOSE Header、Payload、Signature 三部分组成
- [ ] Base64url 编码为什么不等于加密
- [ ] registered claims：`iss`、`sub`、`aud`、`exp`、`nbf`、`iat`、`jti`
- [ ] 签发 JWT 与验证 JWT 分别需要做什么
- [ ] 为什么不能只解码 JWT 而不验证签名和 claims
- [ ] JWS、JWE、JWK、JWKS 与 JWT 的关系
- [ ] HS256、RS256、ES256 的密钥分配和使用场景
- [ ] `alg`、`kid` 的作用以及算法混淆、密钥选择错误的风险
- [ ] Access Token、Refresh Token、ID Token 是否必须使用 JWT
- [ ] 自包含 JWT 与 opaque token 的区别
- [ ] JWT 过期、续期、吊销、黑名单和密钥轮换如何处理
- [ ] JWT 无状态指的是什么，它并不意味着服务端完全不需要状态

## 内容边界

- 本目录讨论认证、授权协议和令牌机制；通用 XSS、CSRF、Cookie 攻防放在独立的 Security 笔记。
- Cookie、`localStorage`、`sessionStorage` 的浏览器行为放在 `docs/browser/store.md`，本目录只讨论令牌或会话信息应该由谁持有。
- HTTPS、TLS 和证书链的建立过程放在 `docs/network`。
- 密码哈希、MFA、Passkey/WebAuthn 等用户认证技术可以单独建立 Authentication 主题，不与 OAuth 授权流程混在一起。

## P0：建议优先学习

### 1. OpenID Connect `oidc.md`

- [ ] OIDC 为什么是在 OAuth 2.0 之上增加的身份层
- [ ] OAuth 解决授权，OIDC 如何补充用户身份认证
- [ ] OpenID Provider、Relying Party、End-User 分别是谁
- [ ] `scope=openid` 的意义
- [ ] ID Token、Access Token、Refresh Token 的用途和接收方
- [ ] 为什么不能使用 Access Token 代替 ID Token 判断用户登录身份
- [ ] ID Token 中 `iss`、`sub`、`aud`、`azp`、`exp`、`iat`、`nonce` 如何验证
- [ ] Authorization Code Flow 中 ID Token 在哪个阶段返回
- [ ] UserInfo Endpoint 与 ID Token claims 的关系
- [ ] `state` 与 `nonce` 的区别
- [ ] Discovery 文档与 `/.well-known/openid-configuration`
- [ ] OIDC 如何通过 JWKS 验证 ID Token 签名

### 2. Session、Cookie 与 Token `sessionAndToken.md`

- [ ] Session 是状态管理概念，Cookie 是浏览器存储和传输机制
- [ ] session ID、Access Token、JWT 分别是什么
- [ ] 服务端 Session 与自包含 Token 的状态、扩展和撤销差异
- [ ] Cookie Session、Bearer Token 两种请求认证方式的流程
- [ ] Cookie 的 `HttpOnly`、`Secure`、`SameSite` 对会话有什么影响
- [ ] Token 放在内存、Cookie、`localStorage` 中的生命周期和暴露面
- [ ] 为什么“JWT 应该存在哪里”不能脱离应用架构直接回答
- [ ] Authorization Header 与 Cookie 自动携带行为的区别
- [ ] 登录态、授权状态与用户资料缓存为什么是三个不同概念
- [ ] 单体 Web 应用、前后端分离应用、原生应用如何选择状态方案

### 3. 浏览器应用中的 OAuth `browserOAuth.md`

- [ ] 浏览器应用为什么属于 public client
- [ ] Authorization Code + PKCE 为什么是浏览器应用的推荐流程
- [ ] Browser-only client、Token-mediating Backend、BFF 三种架构的区别
- [ ] BFF 如何让令牌不直接暴露给浏览器 JavaScript
- [ ] 前端重定向到授权服务器前需要保存哪些事务状态
- [ ] OAuth Callback 应如何验证 `state`、错误响应和返回参数
- [ ] 授权码为什么应当一次性、短时有效并绑定 client 与 Redirect URI
- [ ] 前端路由如何清理回调 URL 中的授权参数
- [ ] 多标签页下如何同步登录、退出和刷新状态
- [ ] 第三方 Cookie 限制如何影响静默登录和 iframe 会话检查
- [ ] popup、全页跳转和 iframe 授权分别有什么限制
- [ ] 前端 SDK 能代替哪些协议细节，哪些验证责任仍不能忽略

### 4. Token 生命周期 `tokenLifecycle.md`

- [ ] Access Token 为什么通常设置较短有效期
- [ ] Refresh Token 为什么需要更严格的保存和使用限制
- [ ] Refresh Token Rotation 如何检测令牌重放
- [ ] 多个请求同时发现 Access Token 过期时如何避免重复刷新
- [ ] 刷新失败、Refresh Token 过期或被撤销时如何回到登录流程
- [ ] 主动退出、管理员禁用用户、密码修改后如何使令牌失效
- [ ] Token Revocation、Token Introspection 分别适用于什么令牌
- [ ] 密钥轮换时旧 JWT 如何在过渡期继续验证
- [ ] 时钟偏差如何影响 `exp`、`nbf`、`iat` 验证
- [ ] 前端是否应该根据 JWT 的 `exp` 主动刷新，以及服务端 401 如何兜底

### 5. OAuth 安全实践 `oauthSecurity.md`

- [ ] 授权码拦截、授权码注入和授权响应注入分别如何发生
- [ ] CSRF、login CSRF 与 OAuth Redirect 流程的关系
- [ ] `state`、PKCE、OIDC `nonce` 的保护边界
- [ ] Redirect URI 宽松匹配与 open redirector 会造成什么问题
- [ ] Access Token 泄漏到 URL、日志、Referer 或浏览器历史的风险
- [ ] mix-up attack 中客户端为什么会把响应关联到错误的授权服务器
- [ ] Refresh Token Rotation 和 sender-constrained token 如何降低重放风险
- [ ] 为什么当前实践要求 Authorization Code + PKCE，并避免 Implicit Grant
- [ ] 为什么授权服务器元数据和严格的 issuer 校验很重要
- [ ] OAuth 错误响应和日志如何避免泄漏 code、token 与用户信息

## P1：高频补充

### 6. Scope、Audience 与权限模型 `authorizationModel.md`

- [ ] scope、role、permission、claim 的区别
- [ ] scope 应描述客户端可执行的操作，还是用户在系统中的角色
- [ ] Access Token 的 `aud` 如何限制令牌只能用于目标 Resource Server
- [ ] 最小权限原则如何影响 scope 设计
- [ ] coarse-grained scope 与 fine-grained permission 如何配合
- [ ] OAuth 解决委托授权，但不直接定义业务内 RBAC、ABAC
- [ ] Resource Server 为什么必须独立校验 issuer、audience、scope 和有效期
- [ ] 多个 Resource Server 是否应该共享同一个 Access Token
- [ ] 增量授权和动态 scope 的使用场景

### 7. 第三方登录与账号绑定 `socialLogin.md`

- [ ] “使用 GitHub/Google 登录”中 OAuth 与 OIDC 各自承担什么职责
- [ ] 使用 OAuth 获取用户资料为什么不等同于标准身份认证协议
- [ ] 第三方身份的稳定唯一标识应如何选择
- [ ] 为什么不能仅凭 email 自动合并本地账号
- [ ] 首次登录、已有账号绑定、解绑和重新授权的流程
- [ ] 用户拒绝授权、取消授权或部分授权时如何处理
- [ ] 第三方 Access Token 应由前端还是后端持有
- [ ] 多个身份提供方绑定到同一账号时如何避免账号接管

### 8. Discovery、Metadata 与密钥轮换 `discovery.md`

- [ ] Authorization Server Metadata 与 OIDC Discovery 的关系
- [ ] issuer、authorization endpoint、token endpoint、JWKS URI 如何发现
- [ ] issuer URL 为什么必须精确校验
- [ ] JWKS 中 `kty`、`kid`、`use`、`alg` 的作用
- [ ] 验证端如何根据 `kid` 选择公钥
- [ ] JWKS 缓存、刷新和未知 `kid` 的处理策略
- [ ] 密钥轮换期间为什么需要同时保留新旧公钥
- [ ] 为什么不能无条件信任 JWT Header 提供的任意密钥地址

### 9. Logout 与单点登录 `logoutAndSso.md`

- [ ] 本地退出、授权服务器会话退出和令牌撤销的区别
- [ ] 删除本地 Token 为什么不一定退出身份提供方会话
- [ ] 单点登录 SSO 的基本流程
- [ ] OIDC RP-Initiated Logout 解决什么问题
- [ ] Front-Channel Logout 与 Back-Channel Logout 的区别
- [ ] 多应用共享身份提供方时如何传播退出状态
- [ ] 第三方 Cookie 限制对静默 SSO 和前通道退出的影响
- [ ] 全局退出是否应该撤销所有设备和所有 Refresh Token

### 10. OAuth 错误处理与前端状态机 `oauthErrors.md`

- [ ] Authorization Endpoint 与 Token Endpoint 的错误返回方式为什么不同
- [ ] `access_denied`、`invalid_request`、`invalid_grant`、`invalid_client` 表示什么
- [ ] 用户取消、授权码过期、PKCE 校验失败和网络失败如何区分
- [ ] 回调处理为什么应当设计为幂等过程
- [ ] 登录中、登录成功、需重试、需重新认证等状态如何建模
- [ ] 防止重复跳转、回调循环和刷新风暴
- [ ] OAuth 错误页面和日志中可以记录哪些信息

## P2：有余力再学

### 11. Token Introspection 与 Revocation `tokenManagement.md`

- [ ] Token Introspection 如何查询令牌是否 active 及其上下文
- [ ] opaque token 为什么常配合 introspection
- [ ] Token Revocation Endpoint 如何撤销 Access Token 或 Refresh Token
- [ ] JWT 的本地验证与远程 introspection 的一致性、延迟和可用性取舍
- [ ] 授权服务器如何表达令牌过期、撤销和权限变化
- [ ] Resource Server 缓存 introspection 结果会带来什么影响

### 12. Sender-Constrained Token `proofOfPossession.md`

- [ ] Bearer Token 的持有者为何可以直接使用令牌
- [ ] sender-constrained token 如何把令牌绑定到特定客户端密钥
- [ ] DPoP proof JWT 中 `jti`、`htm`、`htu`、`iat`、`ath` 的作用
- [ ] DPoP 如何降低 Access Token 泄漏后的可用性
- [ ] DPoP nonce 和重放检测的基本思路
- [ ] mTLS-bound token 与 DPoP 的部署场景差异
- [ ] DPoP 不能消除客户端环境被完全控制后的风险

### 13. PAR、JAR 与 JARM `oauthExtensions.md`

- [ ] Pushed Authorization Requests 为什么把授权参数先发送到后端通道
- [ ] JAR 如何签名或加密 Authorization Request
- [ ] JARM 如何保护 Authorization Response
- [ ] PAR、JAR、JARM 分别保护请求提交、请求内容和响应内容的哪个阶段
- [ ] 这些扩展为什么常见于金融等高保证场景
- [ ] FAPI Profile 如何组合 OAuth/OIDC 扩展提高互操作性

### 14. Device Authorization Grant `deviceFlow.md`

- [ ] Device Authorization Grant 适合哪些输入受限设备
- [ ] device code、user code、verification URI 分别用于什么
- [ ] 设备如何轮询 Token Endpoint
- [ ] `authorization_pending`、`slow_down`、过期和拒绝如何处理
- [ ] 为什么用户必须在另一个可信设备上确认授权
- [ ] Device Flow 与浏览器中的 Authorization Code Flow 如何选择

### 15. OAuth 1.0、OAuth 2.0 与 OAuth 2.1 `oauthVersions.md`

- [ ] OAuth 1.0 的请求签名模型与 OAuth 2.0 Bearer Token 模型有何不同
- [ ] OAuth 2.0 为什么被称为框架，并通过扩展规范补足能力
- [ ] OAuth 2.1 草案整合了哪些 OAuth 2.0 最佳实践
- [ ] OAuth 2.1 为什么省略 Implicit 和 Password Grant
- [ ] OAuth 2.1 尚未成为 RFC 时，项目应依据哪些已发布规范实施
- [ ] 面试中如何避免把 OAuth 2.1 草案描述为已经替代 OAuth 2.0 的正式标准

## 综合题

- [ ] 画出 Authorization Code + PKCE 的完整时序图，并标注每个参数的产生方和验证方
- [ ] 解释 OAuth、OIDC、JWT、Session、Cookie 之间的关系
- [ ] 解释 Access Token、ID Token、Refresh Token 的用途、接收方和生命周期
- [ ] 分析“前端代码中配置了 `client_secret`”为什么不能让 SPA 成为 confidential client
- [ ] 分析 `state`、PKCE、`nonce` 是否可以互相替代
- [ ] 为 SPA 比较 Browser-only、Token-mediating Backend 和 BFF 架构
- [ ] 设计多个并发请求遇到 401 时只刷新一次 Token 的流程
- [ ] 设计 JWT 密钥轮换方案，并说明未知 `kid` 时如何处理
- [ ] 设计第三方登录后的本地账号创建、绑定和解绑流程
- [ ] 分析退出后本地页面、Resource Server、Authorization Server 各自还保留什么状态
- [ ] 从 Redirect URI、授权码、Token 和 Refresh Token 四个位置分析泄漏与重放风险
- [ ] 判断一个具体场景应该使用 Session Cookie、opaque token 还是 JWT

## 建议取舍

- 时间较少：完成 `oauth.md`、`jwt.md` 和 P0 前四项，能完整说明 Authorization Code + PKCE 与 OIDC。
- 常规准备：完成已安排、P0、P1，并能设计浏览器应用的登录、刷新、退出状态机。
- 深入准备：补充 P2，重点理解扩展解决的威胁和适用场景，不必背诵每份 RFC 的全部参数。
