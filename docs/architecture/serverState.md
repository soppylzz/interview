# 服务端状态与缓存

服务端状态具有远端所有权、可能过期和异步同步特征，应明确 initial/loading/success/empty/error/stale，而不是只用 data/null。

cache key 必须包含影响响应的所有稳定参数。并发相同请求可去重；stale time 决定何时需刷新，GC time 决定无人订阅后保留多久，二者不同。

乐观更新先保存可回滚快照，处理多个 mutation 的顺序和服务端冲突；失败时回滚或重新拉取。mutation 后按实体/查询精确更新或 invalidate，避免清空全部缓存。

分页保持页参数和已有数据，infinite query 管理 cursor；预取只用于高概率下一步。Server state 工具不替代本地表单/弹窗状态。
