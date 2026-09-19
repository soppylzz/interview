# 上报通道与可靠性

常规运行期使用 fetch/XHR；页面结束时可用 sendBeacon 或 keepalive fetch 发送小 payload。Beacon 不提供响应读取，keepalive 有大小/生命周期限制，两者都不保证绝对送达。

SDK 在内存队列批量、定时或达到阈值上报，限制事件数和字节，必要时压缩。失败只对网络/限流等可重试错误退避加抖动，服务端用 event id 幂等去重。

离线可选择 IndexedDB 暂存，但要设置容量、TTL 和隐私策略，恢复网络后节流发送。高优先级致命错误与低优先级日志采用不同采样/丢弃策略。

Transport 必须短超时、捕获自身异常、避开业务拦截器递归，并准备 endpoint 故障时静默降级。
