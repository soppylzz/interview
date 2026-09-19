# Session、Cookie 与 Token

> Session 是状态模型，Cookie 是浏览器传输机制，Token 是凭据或授权信息载体；三者不是同一层概念。

## 两种常见模型

### Cookie Session

浏览器 Cookie 保存随机 session ID，服务端根据 ID 查询会话。容易即时撤销和更新权限，但需要共享 session store。Cookie 自动随匹配请求携带，应配置 HttpOnly、Secure、SameSite 并处理 CSRF。

### Bearer Token

客户端显式在 Authorization header 携带 token。Resource Server 验证 opaque token 或 JWT。适合跨 API 和非浏览器客户端，但 token 泄漏即可被使用，生命周期和存储更复杂。

## 存储

- HttpOnly Cookie：JavaScript 不能直接读取，可降低 XSS 直接窃取 token 的能力，但请求仍可能被 XSS 代发。
- 内存：刷新页面丢失，暴露时间短，仍可被同页恶意脚本使用。
- localStorage：跨刷新持久、同步 API、任何同源脚本可读取。

没有脱离架构的统一答案。BFF 常把 OAuth token 保存在服务端，只给浏览器 session cookie。

登录状态、API 授权状态和用户资料缓存要分开：资料存在不代表 token 有效，token 有效也不代表 UI 缓存最新。

## Interview

Cookie 不等于 Session：Cookie 也能存偏好或 token；Session ID 也可通过非 Cookie 方式传递，只是浏览器中 Cookie 最常见。
