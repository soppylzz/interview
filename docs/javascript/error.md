# 错误与资源管理

应抛出 Error 或其子类，并通过 name、message、cause 和业务字段保留上下文。只抛字符串会损失可靠堆栈和分类能力。

try 处理同步 throw 以及当前 await 的 rejection；异步 callback 中的 throw 不会被外层已经结束的 try 捕获。finally 无论成功失败都会执行，但在其中 return 会覆盖原结果，应避免。

错误边界要区分可恢复业务错误、临时基础设施错误和程序缺陷。包装错误时保留 cause，不在每层重复记录同一异常。

AbortSignal 是协作取消：接收方必须监听 signal、终止底层工作并清理资源。显式资源管理通过 dispose/asyncDispose 建立确定性释放；GC 与 FinalizationRegistry 不能替代文件、锁、连接和监听器的显式关闭。
