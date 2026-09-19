# Token 生命周期

> Token 设计要同时处理签发、使用、续期、撤销、重放检测和密钥轮换。

Access Token 应短期有效，缩小泄漏窗口；Refresh Token 生命周期更长、权限更强，只发送给 Authorization Server，需更严格保存。

## Refresh Rotation

每次刷新签发新 refresh token，并使旧 token 失效。若旧 token 再次出现，说明 token family 可能泄漏，可撤销整个 family 并要求重新认证。

前端并发请求同时遇到过期时，应共享一个 refresh promise：第一个请求发起刷新，其余等待；成功后重放请求，失败则只触发一次退出/重新登录，避免 refresh storm。

## 失效

- 自然过期：exp。
- 主动撤销：revocation endpoint 或服务端状态。
- 用户禁用/权限改变：短 token TTL、introspection 或版本字段。
- 退出：清本地状态，并按需求撤销 refresh/access token 和 IdP session。

JWT key rotation 时 JWKS 同时保留新旧公钥，旧 token 到期后再移除旧 key。未知 kid 可触发一次受控刷新，不能无限重试或接受未验证 token。

客户端可根据 exp 提前刷新改善体验，但 Resource Server 的 401 才是最终依据。允许小范围 clock skew，不能忽略过期验证。
