# 请求层设计

底层 client 处理 base URL、header、超时、序列化；领域 API 暴露 `getUser(id)` 等业务调用；页面只消费领域结果，避免散落 URL 和状态码判断。

每次请求接收 AbortSignal，把路由/组件取消传到底层。timeout 应真正 abort。仅对网络失败、429/部分 5xx 等临时错误重试，使用指数退避抖动并遵守 Retry-After。

写操作重试需要幂等键或服务端幂等语义。Token 过期时使用 single-flight refresh，其余请求等待同一 Promise；刷新失败只触发一次退出，防止风暴。

错误分为取消、网络、协议、业务和程序解析错误，保留 cause/request ID。统一层负责协议，不要把所有业务 toast 和跳转塞进 interceptor。
