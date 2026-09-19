# 用户行为与 Breadcrumb

Breadcrumb 是异常前有限时间窗口的导航、点击、请求、console 和状态事件摘要，通常用固定大小环形缓冲区保存。

点击记录稳定的组件/语义标识，避免完整 DOM path；输入只记录发生和字段类型，不记录实际值。请求记录归一化 endpoint/status/耗时，不上传敏感参数。

每条 breadcrumb 含时间、category、level 和小型 data。异常上报时附带快照，之后继续使用新缓冲，防止无限增长。

它比 Session Replay 成本低、隐私面小，但不能重现全部画面。两者用相同 session/event id 关联，不必对所有用户开启完整 replay。
