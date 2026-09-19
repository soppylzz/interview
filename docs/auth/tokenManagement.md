# Token Introspection 与 Revocation

> Introspection 查询 token 当前状态；Revocation 主动使 token 或相关授权失效。

Resource Server 把 token 发送给 Authorization Server 的 introspection endpoint，可获得 `active`、scope、client_id、sub、aud、exp 等信息。Opaque token 常依赖 introspection；JWT 通常本地验证，也可结合状态检查。

本地 JWT 验证延迟低、对 Authorization Server 可用性依赖小，但权限变化和撤销传播慢。Introspection 状态新鲜但增加网络延迟、负载和故障依赖。缓存结果可折中，却重新引入撤销延迟。

Revocation endpoint 接收 refresh/access token。撤销 refresh token 时，服务器可同时撤销同一 grant/family。调用成功不保证所有已缓存判断瞬间消失。

实践中使用短 access token + 可撤销/轮换 refresh token；高风险 API 可额外 introspect 或检查 session/token version。
