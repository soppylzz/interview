# Frontend Architecture 学习清单

> 用于筛选中大型前端应用中的架构与场景题。重点解释边界如何划分、变化如何隔离、故障如何控制，以及方案为什么适合当前规模。

## 内容边界

- 构建工具、Monorepo、CI/CD 和微前端实现放在 `docs/engineering`。
- 浏览器、网络、性能与安全机制分别放在对应目录。
- React/Vue 的框架内部原理不在本目录。
- 本目录聚焦应用层模块、数据流、请求、路由、权限和演进决策。

## P0：建议优先学习

### 1. 架构目标与约束 `architectureBasics.md`

- [ ] 架构解决的是变化、协作和风险，不是目录美观
- [ ] 业务规模、团队规模、发布频率和生命周期
- [ ] cohesion、coupling、dependency direction
- [ ] quality attributes：性能、可靠性、安全、可维护性
- [ ] 架构决策记录 ADR
- [ ] over-engineering 与何时保持简单

### 2. 前端分层与依赖方向 `layering.md`

- [ ] UI、application、domain、infrastructure 的职责
- [ ] 页面、组件、服务、数据访问如何划分
- [ ] 依赖反转在前端如何落地
- [ ] barrel file 和跨层 import 风险
- [ ] 循环依赖如何产生和发现
- [ ] 按技术分层与按业务 feature 分组的取舍

### 3. 组件设计与边界 `componentDesign.md`

- [ ] container/presentational 的思想和限制
- [ ] controlled、uncontrolled 与状态所有权
- [ ] props、events、slots/render props/composition
- [ ] smart component 变大的信号
- [ ] 组件 API 的最小能力与可组合性
- [ ] headless component 和设计系统组件

### 4. 状态建模与所有权 `state.md`

- [ ] local、shared、server、URL、persistent state
- [ ] state colocation 与 lifting state up
- [ ] derived state 为什么不应重复存储
- [ ] normalized state 和 entity identity
- [ ] finite state machine 表达互斥状态
- [ ] immutable update、selector 和订阅粒度

### 5. 服务端状态与缓存 `serverState.md`

- [ ] loading、success、empty、error、stale 状态
- [ ] cache key、deduplication、stale time、garbage collection
- [ ] optimistic update 与 rollback
- [ ] pagination、infinite query 和 prefetch
- [ ] mutation 后 invalidation 与精确更新
- [ ] 服务端状态为什么不等同于全局客户端状态

### 6. 请求层设计 `requestLayer.md`

- [ ] fetch client、业务 API 和页面调用的分层
- [ ] base URL、header、序列化和响应解析
- [ ] AbortSignal、timeout 与取消传播
- [ ] retry、backoff、jitter 与幂等性
- [ ] token refresh single-flight 与请求重放
- [ ] 错误分类、request ID 和可观测性

### 7. 路由与页面架构 `routing.md`

- [ ] route tree 与布局嵌套
- [ ] URL 为什么应承载可分享状态
- [ ] loader、guard、redirect 和 error boundary
- [ ] route-level code splitting
- [ ] 导航竞态与旧请求取消
- [ ] 404、403、登录回跳和深链接

### 8. 权限与功能控制 `permission.md`

- [ ] authentication 与 authorization
- [ ] RBAC、ABAC 和 resource-based authorization
- [ ] 页面、路由、组件和操作权限
- [ ] 前端权限为什么只控制体验、不构成安全边界
- [ ] feature flag、实验和权限的区别
- [ ] 权限变化、缓存和重新认证

## P1：高频补充

### 9. 错误处理与降级 `errorHandling.md`

- [ ] programmer error、operational error、user error
- [ ] 页面、组件、请求和全局错误边界
- [ ] retry、fallback、empty state 和 partial failure
- [ ] 错误信息如何对用户可行动
- [ ] 失败隔离与避免级联故障
- [ ] 错误上报和恢复后的状态一致性

### 10. 表单架构 `formArchitecture.md`

- [ ] field state、form state、server state
- [ ] sync、async 和 cross-field validation
- [ ] schema validation 与类型推导
- [ ] touched、dirty、submitting、error
- [ ] 动态表单、数组字段和条件字段
- [ ] 自动保存、草稿、冲突和离开提示

### 11. 配置与环境 `configuration.md`

- [ ] build-time 与 runtime config
- [ ] 默认值、环境覆盖和远程配置
- [ ] 客户端配置不能包含秘密
- [ ] 配置 schema、版本和启动校验
- [ ] 多租户、白标和主题配置
- [ ] feature flag 的生命周期与清理

### 12. Design System `designSystem.md`

- [ ] design token、primitive、component、pattern
- [ ] 主题、密度、响应式和可访问性
- [ ] 受控扩展与 escape hatch
- [ ] 版本、迁移和视觉回归
- [ ] CSS 隔离和样式覆盖策略
- [ ] 设计与开发的契约

### 13. 数据一致性与并发 `concurrency.md`

- [ ] stale response 覆盖新状态
- [ ] request sequence、abort 和 latest-wins
- [ ] optimistic concurrency 与版本号
- [ ] 多标签页同步与冲突
- [ ] realtime update 与本地编辑合并
- [ ] at-least-once 消息下的幂等处理

### 14. 模块化与领域边界 `modularity.md`

- [ ] bounded context 在前端的简化使用
- [ ] public API 与内部实现
- [ ] feature module 的入口和依赖规则
- [ ] shared 目录为何容易成为垃圾场
- [ ] 跨模块事件、命令与直接调用
- [ ] 何时拆包、拆仓或微前端

### 15. 实时与离线应用 `offlineAndRealtime.md`

- [ ] online-first、offline-first 和 local-first
- [ ] cache、outbox、sync 与 conflict resolution
- [ ] WebSocket/SSE 状态进入现有数据层
- [ ] 重连、补偿、心跳和消息顺序
- [ ] 网络状态不可靠时的 UI 表达
- [ ] 本地 schema 迁移

### 16. 性能架构 `performanceArchitecture.md`

- [ ] 页面级性能预算
- [ ] route/component/data 的加载边界
- [ ] 渲染策略按页面选择
- [ ] 大列表、大表单、大屏的状态与绘制拆分
- [ ] 第三方能力的加载和隔离
- [ ] 性能决策如何进入架构评审

## P2：有余力再学

### 17. 多应用与平台化 `platform.md`

- [ ] application shell 与共享平台能力
- [ ] plugin architecture 与扩展点
- [ ] iframe、runtime integration、module federation
- [ ] shared dependency 和版本治理
- [ ] 独立发布与统一体验
- [ ] 平台团队与业务团队职责

### 18. 迁移与遗留系统治理 `migration.md`

- [ ] strangler pattern
- [ ] 新旧路由、状态和样式共存
- [ ] adapter 与 anti-corruption layer
- [ ] codemod、feature flag 和灰度迁移
- [ ] 迁移指标和回滚
- [ ] 何时重写、何时渐进改造

### 19. 前端可靠性 `reliability.md`

- [ ] SLI、SLO 与 error budget 的前端解释
- [ ] dependency failure 与超时预算
- [ ] circuit breaker、bulkhead 和 fallback 的适用边界
- [ ] 静态资源发布与 chunk 兼容
- [ ] graceful degradation 和 kill switch
- [ ] 故障演练与 runbook

### 20. 架构评审与方案表达 `architectureReview.md`

- [ ] 问题、约束、目标和非目标
- [ ] 备选方案与 trade-off
- [ ] 数据流、依赖图和时序图
- [ ] rollout、monitoring、rollback
- [ ] 风险、未知项和验证计划
- [ ] 如何避免用工具名代替架构理由

## 综合题

- [ ] 为中后台设计模块、路由、状态、请求和权限分层
- [ ] 设计 token 过期时的并发刷新和失败恢复
- [ ] 解决搜索页快速切换条件导致的响应竞态
- [ ] 为复杂表单设计校验、草稿、提交和离开保护
- [ ] 设计离线编辑与恢复联网后的同步冲突处理
- [ ] 判断共享组件、npm 包、Monorepo 和微前端的拆分边界
- [ ] 为一次大型重构制定渐进迁移、监控和回滚方案
- [ ] 用 ADR 比较两个可行方案的成本与收益

## 建议取舍

- 时间较少：完成 P0，掌握分层、状态、请求、路由和权限。
- 常规准备：完成 P0、P1，能够回答项目场景题并画出数据流。
- 深入准备：补充 P2，用真实项目完成一份 ADR 或架构评审稿。
