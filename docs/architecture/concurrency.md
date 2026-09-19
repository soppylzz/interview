# 数据一致性与并发

快速切换条件时旧响应可能晚到并覆盖新状态。使用 AbortController 取消旧请求，并以 request/navigation sequence 在提交结果时再次验证，形成 latest-wins。

乐观写入需保存 base version/rollback。服务端可用 ETag/version 做 optimistic concurrency，冲突时提示合并、重新加载或按领域规则解决，不能静默覆盖。

多标签页用 BroadcastChannel/storage 消息同步失效或版本，不直接假定两边同时写的顺序。实时推送带 sequence/revision，断线后从 last cursor 补数据。

消息和重试常是 at-least-once，写操作用 idempotency key 去重。UI 显示 pending、conflict、synced 状态，让一致性过程可见。
