# 配置、日志与可观测性

配置可按默认值、配置文件、环境变量、启动参数分层覆盖，密钥由专用 secret 系统注入。启动时完成解析和校验，避免在业务路径反复读取未经验证的字符串。

结构化日志用固定字段记录 level、time、service、requestId、traceId 和事件数据，便于检索聚合。Token、Cookie、密码和个人信息应在进入日志前脱敏。

## 三类信号

- metrics 回答趋势和阈值，例如吞吐、错误率、延迟。
- logs 保存离散事件和上下文。
- traces 展示一次请求跨服务、跨阶段的因果链。

AsyncLocalStorage 可让同一请求的异步调用读取 request/trace context，减少层层传参，但业务正确性不应依赖一个可能缺失的日志上下文。

event loop delay 反映回调被推迟的程度，event loop utilization 反映循环忙碌比例。高 CPU profile 用于找热点；heap snapshot 对比对象保留链；process report 保存崩溃或卡顿时的运行时、线程和系统信息。

告警需要同时关联 release、实例和请求标识，才能从指标异常进入 trace，再落到日志和 profile。
