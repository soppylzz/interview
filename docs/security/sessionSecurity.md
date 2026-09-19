# Cookie、Session 与 Token 安全

会话 Cookie 通常使用 Secure、HttpOnly、合适 SameSite、最窄 Path，并省略不必要的 Domain。`__Host-` 前缀可要求 Secure、Path=/、无 Domain。

登录后轮换 session ID 防 fixation；登出和风险事件服务端撤销；高风险操作重新认证。权限变化不能只等 token 自然过期。

localStorage token 可被 XSS 读取；HttpOnly Cookie 不可读但自动携带，需要 CSRF 防御。不存在脱离威胁模型的绝对最佳存储。

access token 短生命周期、最小 audience/scope；refresh token rotation 配合 family 重放检测。前端避免日志和 URL 泄露 token，并在多个请求同时过期时只执行一次刷新。
