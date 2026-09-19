# 日志设计

结构化日志使用稳定字段：time、level、category、message、release、sessionId、requestId 和 context，便于检索聚合。message 给人读，字段给机器分析。

debug/info/warn/error 按可行动程度定义，不能把所有异常都记 error。breadcrumb 保留最近事件，业务日志记录关键状态转移，避免打印整个 store。

Token、Cookie、Authorization、密码、身份证、表单文本等在采集前脱敏；URL query 和 header 也可能包含敏感信息。使用 allowlist 比事后黑名单可靠。

限制单条大小、每分钟条数、维度基数和保留期。劫持 console 可能改变行为、重复日志和影响性能，只作为受控适配并保留原方法。
