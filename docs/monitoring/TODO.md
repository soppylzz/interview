# Frontend Monitoring 学习清单

> 用于筛选前端监控、错误追踪和线上诊断知识。重点建立采集、关联、告警、定位和恢复闭环，而不是只会调用上报 SDK。

## 内容边界

- Web Vitals 和性能 RUM 放在 `docs/perf/monitoring.md`。
- Source Map 构建原理放在 `docs/engineering/sourceMap.md`。
- Node 服务端可观测性放在 `docs/node/observability.md`。
- 本目录聚焦浏览器端异常、日志、用户行为与线上诊断体系。

## P0：建议优先学习

### 1. 前端监控体系 `monitoringSystem.md`

- [ ] errors、logs、metrics、traces、replay 分别回答什么问题
- [ ] 采集、缓冲、上报、处理、聚合、告警和排查链路
- [ ] release、environment、session、user、device 维度
- [ ] RUM 与实验室监控的区别
- [ ] 可观测性与业务埋点的边界
- [ ] 数据质量、成本、隐私和采样的权衡

### 2. JavaScript 异常采集 `javascriptError.md`

- [ ] window error 事件和 `window.onerror`
- [ ] unhandledrejection
- [ ] 同步异常、异步异常和框架错误边界
- [ ] Error name、message、stack、cause
- [ ] 跨源脚本的错误信息限制
- [ ] 重复捕获与去重

### 3. 资源与网络错误 `resourceError.md`

- [ ] script、link、img 等资源加载失败如何捕获
- [ ] error 事件为什么常需要捕获阶段
- [ ] fetch/XHR 的网络失败与 HTTP 错误
- [ ] timeout、abort、offline、DNS/TLS 错误可见性
- [ ] Resource Timing 的跨源限制
- [ ] 接口错误如何关联 request ID

### 4. Source Map 与版本关联 `sourceMap.md`

- [ ] 压缩堆栈如何还原源码位置
- [ ] release、dist、chunk URL 和 artifact 的关联
- [ ] code splitting 后的 map 上传
- [ ] hidden source map 与源码公开风险
- [ ] source map 不匹配如何识别
- [ ] 上传、保留和删除策略

### 5. 上报通道与可靠性 `transport.md`

- [ ] fetch、keepalive fetch、sendBeacon、XHR、image ping
- [ ] 页面卸载时的送达限制
- [ ] 批量、压缩、队列、重试和退避
- [ ] 离线缓存与恢复上报
- [ ] 服务端幂等、去重和限流
- [ ] 监控 SDK 自身失败不能影响业务

### 6. 白屏、崩溃与可用性 `availability.md`

- [ ] 白屏如何定义而不是只检查 body 为空
- [ ] DOM、像素、关键元素和业务心跳方案
- [ ] ChunkLoadError 与发布版本不匹配
- [ ] 页面卡死、Long Task 和内存崩溃信号
- [ ] 页面被杀死时为什么可能没有最终上报
- [ ] 自动刷新与降级的风险

## P1：高频补充

### 7. 日志设计 `logging.md`

- [ ] structured log 与自由文本
- [ ] level、category、context 和 breadcrumb
- [ ] request ID、trace ID、session ID
- [ ] Token、Cookie、个人信息脱敏
- [ ] 日志容量、采样和保留期限
- [ ] console 劫持的收益与副作用

### 8. 用户行为与 Breadcrumb `breadcrumb.md`

- [ ] navigation、click、request、console、state change
- [ ] 如何限制 payload 和敏感内容
- [ ] selector 稳定性与可读性
- [ ] 异常发生前的环形缓冲区
- [ ] breadcrumb 与完整 session replay 的区别

### 9. SPA 路由与生命周期 `spa.md`

- [ ] 首次导航与软导航如何区分
- [ ] pushState、popstate 和框架 Router 集成
- [ ] 页面停留、退出和后台切换
- [ ] BFCache 恢复对 session 的影响
- [ ] 路由级错误率与性能指标

### 10. Trace 与前后端关联 `tracing.md`

- [ ] trace、span、parent、attribute、event
- [ ] Trace Context 传播
- [ ] fetch/XHR 注入 trace header 的 CORS 影响
- [ ] 前端交互到 API、服务和数据库的链路
- [ ] 采样决策与错误强制保留
- [ ] 高基数字段为什么危险

### 11. 告警与异常聚合 `alerting.md`

- [ ] fingerprint 如何聚合同类错误
- [ ] sourcemap 前后 stack 的稳定性
- [ ] rate、affected users、new issue、regression
- [ ] 静态阈值、同比和异常检测
- [ ] 告警疲劳与抑制
- [ ] owner、runbook 和升级路径

### 12. Session Replay `sessionReplay.md`

- [ ] DOM mutation replay 与视频录屏的区别
- [ ] 输入、文本、图片和第三方 iframe 脱敏
- [ ] 采样、性能和存储成本
- [ ] replay 如何与错误/trace 对齐
- [ ] 用户同意、访问审计和保留期限

## P2：有余力再学

### 13. 监控 SDK 设计 `sdk.md`

- [ ] 插件化采集器与 transport
- [ ] monkey patch 的幂等、兼容和卸载
- [ ] 全局单例与多个 SDK 实例
- [ ] 队列背压、大小限制和降级
- [ ] SDK 版本、自监控和远程配置

### 14. 隐私与合规 `privacy.md`

- [ ] 数据最小化、目的限制和保存期限
- [ ] PII、敏感数据和 pseudonymous ID
- [ ] consent 与撤回
- [ ] 数据地域和第三方处理者
- [ ] 删除请求与访问控制

### 15. 线上故障响应 `incident.md`

- [ ] detect、triage、mitigate、resolve、review
- [ ] release 对比、feature flag、rollback
- [ ] source map、日志、trace 和 replay 的证据顺序
- [ ] 修复后的验证和回归监控
- [ ] blameless postmortem 与行动项

## 综合题

- [ ] 设计一个不会影响业务的前端异常采集 SDK
- [ ] 排查只在少量用户出现的白屏
- [ ] 把一次点击、接口 500 和服务端 trace 串联起来
- [ ] 设计 sourcemap 上传与 release 发布流程
- [ ] 给错误率突增设计聚合、阈值和降噪策略
- [ ] 说明监控数据如何脱敏和限制成本

## 建议取舍

- 时间较少：完成 P0，掌握异常、资源失败、版本关联和上报。
- 常规准备：完成 P0、P1，能够设计从告警到定位的闭环。
- 深入准备：补充 P2，并实现一个最小监控 SDK。
