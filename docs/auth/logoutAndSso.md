# Logout 与单点登录

> 登录状态可能同时存在于应用 Session、OAuth token、Authorization Server Session 和其他应用中，退出必须明确要清理哪一层。

- Local logout：清理当前应用 cookie/token。
- Token revocation：使 refresh/access token 不再有效。
- OP logout：结束 Identity Provider 会话。
- Global logout：尝试通知多个 Relying Party 清理各自会话。

删除本地 token 不会自动退出 IdP；退出 IdP 也不保证已签发的短期 access token 立即失效。

OIDC RP-Initiated Logout 让 RP 请求 OP 退出，并可提供 post-logout redirect。Front-Channel Logout 依赖浏览器加载各 RP logout URL，受第三方 Cookie 和页面失败影响；Back-Channel Logout 由 OP 直接通知 RP，更可靠但要求服务端 endpoint。

SSO 通过共享 IdP Session 让第二个应用无需再次输入凭据，但每个应用仍有独立 Client、token 和本地 Session。

全局退出是否撤销所有设备应由产品语义决定，通常区分“退出当前设备”和“退出所有设备”。
