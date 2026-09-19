# 实时与离线应用

online-first 优先服务器并提供缓存 fallback；offline-first 关键流程断网可用；local-first 让本地副本成为即时交互核心并后台同步。复杂度逐级增加。

离线写入进入 outbox，包含 operation id、base version 和状态；恢复后按序/依赖同步，服务端幂等。冲突可 last-write-wins、字段合并、CRDT 或人工解决，需按业务选择。

WebSocket/SSE 消息应进入同一 entity/query 数据层，不另建第二份状态。用 sequence、cursor、snapshot 处理乱序、丢失和重连补偿；心跳只判断连接，不证明业务同步完成。

UI 明确 offline、pending、failed、conflict。IndexedDB schema 和缓存格式需要版本迁移及失败回退。
