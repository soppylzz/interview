# OAuth 错误处理与前端状态机

> OAuth 是跨页面、跨网络的多步骤事务，前端应把它建模为状态机，而不是一组零散跳转。

Authorization Endpoint 错误通常通过 redirect URI 返回 `error` 和 state；Token Endpoint 错误是直接 HTTP/JSON 响应，不能把 token endpoint 错误展示给任意前端跳转地址。

常见错误：

- `access_denied`：用户或服务器拒绝授权。
- `invalid_request`：缺少/错误参数。
- `invalid_grant`：code/refresh token 无效、过期、已使用或绑定不匹配。
- `invalid_client`：客户端认证失败。
- `temporarily_unavailable`：授权服务暂不可用。

推荐状态：idle → redirecting → callback-validating → exchanging → authenticated；另有 denied、retryable-error、reauth-required。

Callback 应幂等：重复加载不能重复兑换 code；事务消费后立即标记完成。限制 redirect 次数，区分网络重试与必须重新登录，refresh 失败只触发一次状态清理。

日志记录 request/trace ID、错误类别和 provider，不记录 code、token、verifier、Cookie 或完整个人 claims。
