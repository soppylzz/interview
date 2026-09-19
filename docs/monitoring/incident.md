# 线上故障响应

流程是 detect、triage、mitigate、resolve、review。先确认用户影响和范围，再比较 release、环境、路由、设备，建立时间线和一个指挥/沟通入口。

缓解优先于完美修复：关闭 feature flag、回滚、切备用接口或降级。任何动作都观察关键指标，避免二次损害。

定位证据顺序通常是告警聚合 → release diff → stack/source map → breadcrumb/replay → trace/log；保留假设和反证，不凭单个用户录像下结论。

修复后验证错误率、用户恢复和边缘路径。Blameless postmortem 记录触发条件、检测/控制缺口与有 owner/期限的行动项，并更新 runbook 和演练。
