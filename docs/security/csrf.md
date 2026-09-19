# CSRF

CSRF 利用浏览器自动携带 Cookie/HTTP 认证等环境凭证，诱导已登录用户向目标站点执行非预期操作。攻击者不一定能读取响应。

优先组合 SameSite Cookie、不可预测 CSRF token 和 Origin/Referer 校验。Synchronizer token 存服务端会话，double-submit 把 token 同时放 Cookie 与请求位置并验证绑定/签名。

SameSite=Lax 能阻止很多跨站子请求，但顶层导航、旧环境和同站不同源攻击需要继续考虑；None 必须配合 Secure。GET 必须保持无副作用。

自定义 header 常触发预检，可提高攻击门槛，但不能把 CORS 当完整 CSRF 防御。Login CSRF 会把受害者登录到攻击者账号，仍需 state/token 绑定浏览器发起的事务。
