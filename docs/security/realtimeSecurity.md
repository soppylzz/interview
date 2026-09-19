# WebSocket 与实时通信安全

WebSocket 不走普通 fetch CORS 判断，但浏览器握手会发送 Origin，服务端必须验证允许来源。Cookie 自动参与握手时需防 Cross-Site WebSocket Hijacking，可使用 SameSite、Origin 和显式短期 ticket。

连接认证后，每条消息仍需 schema 校验和资源级授权；不能相信客户端订阅的 room/user id。限制消息大小、速率、并发订阅和积压，防止内存与 CPU 耗尽。

重连可能重复发送消息，业务使用 idempotency key、sequence 和 ack 处理至少一次语义。敏感数据不写日志，错误响应不暴露内部堆栈。

token 过期、权限变化和登出时应关闭或重新授权现有连接，而不是只保护初始握手。
