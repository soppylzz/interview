# 前端可靠性

SLI 是错误率、可用交互等指标，SLO 是目标，error budget 表示可接受失败额度。前端 SLI 需来自真实用户并按关键页面/操作定义。

调用链设置逐级缩小的 timeout budget，避免所有依赖一起等到页面总超时。Circuit breaker 适合持续失败依赖，bulkhead 隔离并发/资源，fallback 提供缓存或降级；浏览器实现应保持简单并与服务端协调。

发布先上传 hash 资源再切 HTML，保留旧 chunk。Feature kill switch 可快速关闭高风险能力，静态 fallback 保留核心入口。

Runbook 写清症状、仪表盘、缓解和 owner；定期演练 CDN、API、第三方和配置故障，验证机制真正可用。
