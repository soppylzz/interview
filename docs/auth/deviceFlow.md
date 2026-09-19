# Device Authorization Grant

> Device Flow 适合电视、CLI 等输入受限或没有合适浏览器的设备，让用户在另一台设备完成授权。

1. Device 向 authorization server 请求 device authorization。
2. 获得高熵 `device_code`、便于输入的 `user_code`、verification URI、interval 和有效期。
3. 展示 user code/二维码，用户在可信设备打开 URI 并确认。
4. Device 按 interval 轮询 Token Endpoint。
5. 成功后获得 token。

轮询可能返回 `authorization_pending`、`slow_down`、`access_denied`、`expired_token`。Client 必须尊重 interval/slow_down，避免压垮服务。

user code 只用于用户交互，不能替代高熵 device code。设备应保护 device code，并明确显示当前授权对象，防止用户为攻击者设备完成授权。

普通网页能安全执行顶层重定向时，应使用 Authorization Code + PKCE，而不是 Device Flow。
