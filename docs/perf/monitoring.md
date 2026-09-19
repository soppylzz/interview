# 性能监控与上报

PerformanceObserver 可订阅 navigation、resource、paint、largest-contentful-paint、layout-shift、longtask、event 等浏览器支持的 entry。Navigation Timing 描述文档导航，Resource Timing 描述单资源阶段，Long Tasks 和 Event Timing 帮助定位主线程与交互。

web-vitals 库在原始 Performance API 上封装 Core Web Vitals 的生命周期和兼容细节；自行采集时需处理候选更新、页面隐藏、BFCache 和浏览器支持。

页面结束时常用 `sendBeacon` 或 keepalive fetch 发送小批数据，提高卸载阶段送达概率，但仍不能保证成功。客户端先缓冲、限量和采样，服务端去重。

## 数据设计

记录 metric/value、页面类型、路由、会话、设备、网络、版本和关键资源标识，同时控制隐私与基数。SPA 需定义软导航起点、内容完成和交互范围，不能直接套首次 navigation 指标。

聚合使用分位数并清理机器人、重复事件和不支持数据。告警结合样本量、持续窗口与版本对比；异常再关联 release、接口耗时、资源 hash、trace 和用户行为，才能形成定位闭环。
