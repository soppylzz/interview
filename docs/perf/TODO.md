# Frontend Performance 学习清单

> 用于筛选前端面试中的性能优化知识点。回答性能题时应先说明指标和瓶颈，再提出针对性的优化与验证方式，避免只罗列手段。

## 内容边界

- 浏览器解析、布局、绘制、光栅化和合成的完整流程放在 `docs/browser/rendering.md`。
- HTTP 缓存放在 `docs/browser/cache.md`，HTTP 版本、连接复用、CDN 原理放在 `docs/network`。
- BFC、字体、动画和 CSS 属性行为放在 `docs/css`；本目录只讨论它们对性能指标的影响。
- Vite、Webpack、Tree Shaking、构建产物分析等工具原理放在 `docs/engineering`。

## P0：建议优先学习

### 1. 性能优化方法论 `performanceMethodology.md`

- [ ] 性能优化为什么应从用户场景、指标和数据开始
- [ ] 加载性能、运行时性能、交互响应、内存和稳定性的区别
- [ ] 实验室数据与真实用户数据 RUM 的区别
- [ ] 平均值为什么可能掩盖长尾问题，P50、P75、P95 如何使用
- [ ] 建立基线、定位瓶颈、实施优化、回归验证的完整闭环
- [ ] 如何区分网络、主线程、渲染、内存和后端瓶颈
- [ ] 性能预算如何防止指标在长期迭代中退化
- [ ] 优化收益、实现成本、维护成本和用户影响如何权衡

### 2. Core Web Vitals 与常见指标 `metrics.md`

- [ ] TTFB、FCP、LCP、INP、CLS 分别衡量什么
- [ ] LCP 候选元素如何变化，最终 LCP 在什么时候确定
- [ ] LCP 可以拆成 TTFB、资源加载延迟、资源加载时间和元素渲染延迟
- [ ] INP 为什么关注一次交互中最慢的展示反馈，而不是只测事件回调
- [ ] CLS 的 layout shift 与 session window 如何计算
- [ ] 用户主动操作引发的布局变化为什么不一定计入 CLS
- [ ] FP、FCP、DOMContentLoaded、load 与可用、可交互不是同一个概念
- [ ] TBT 与 INP 的关系，以及实验室指标为什么不能完全替代真实 INP
- [ ] 指标良好阈值应以哪个分位数和设备范围判断

### 3. 关键渲染路径 `criticalRenderingPath.md`

- [ ] HTML、CSS、JavaScript 如何影响首次渲染
- [ ] CSS 为什么通常是渲染阻塞资源
- [ ] 普通 script、async、defer、module 对解析和执行的影响
- [ ] 关键 CSS、非关键 CSS 和首屏样式如何划分
- [ ] 减少关键请求链长度与减少资源数量有什么区别
- [ ] preload、modulepreload、preconnect、dns-prefetch、prefetch 的适用场景
- [ ] fetchpriority 如何表达资源优先级提示
- [ ] 预加载错误资源或设置错误优先级为什么可能产生负优化
- [ ] 如何从 Network waterfall 中识别资源发现过晚和请求串行

### 4. JavaScript 与主线程 `mainThread.md`

- [ ] 解析、编译、执行 JavaScript 为什么都会占用主线程
- [ ] Long Task 如何阻塞输入处理和渲染
- [ ] 一个交互如何经历输入延迟、处理时间和展示延迟
- [ ] 如何通过任务拆分和 `scheduler.yield()` 让出主线程
- [ ] `requestAnimationFrame()` 与视觉更新的关系
- [ ] `requestIdleCallback()` 为什么只适合可延迟的低优先级任务
- [ ] 微任务过多为什么也会阻止浏览器进入渲染
- [ ] Web Worker 适合迁移哪些 CPU 密集工作
- [ ] Worker 通信、结构化克隆和数据传输的成本

### 5. 重排、重绘与合成 `renderingPerformance.md`

- [ ] 修改哪些类型的属性可能触发布局、绘制或仅合成
- [ ] 读取布局属性为什么可能强制刷新待处理样式和布局
- [ ] 读写交错如何产生 layout thrashing
- [ ] 批量读取、批量写入和下一帧调度如何减少同步布局
- [ ] `transform`、`opacity` 动画通常为何成本较低
- [ ] 合成层不是越多越好，额外层会消耗哪些资源
- [ ] `will-change` 应何时添加、何时移除
- [ ] `content-visibility`、CSS containment 如何缩小渲染工作范围

### 6. 图片与媒体优化 `image.md`

- [ ] JPEG、PNG、WebP、AVIF、SVG 的适用场景
- [ ] 有损压缩、无损压缩和视觉质量如何权衡
- [ ] `srcset`、`sizes`、`picture` 如何提供响应式图片
- [ ] 图片实际显示尺寸与资源像素尺寸为什么应匹配
- [ ] `loading="lazy"` 适合哪些图片，为什么不应滥用于 LCP 图片
- [ ] `decoding`、fetchpriority、preload 如何影响关键图片
- [ ] width、height、`aspect-ratio` 如何避免图片引发 CLS
- [ ] CSS background image 与 `<img>` 在发现优先级和语义上的差异
- [ ] 视频 poster、预加载策略和自适应码率的基本思路

### 7. 字体优化 `font.md`

- [ ] FOIT、FOUT 分别是什么
- [ ] `font-display` 各取值如何影响字体展示
- [ ] WOFF2、字体子集化和 unicode-range 的作用
- [ ] 关键字体 preload 的收益与误用成本
- [ ] fallback 字体度量不同为什么会引发 CLS
- [ ] `size-adjust`、ascent/descent override 如何降低字体切换位移
- [ ] 可变字体与多个独立字体文件的体积取舍
- [ ] 系统字体栈适合什么场景

### 8. JavaScript 资源加载 `javascriptLoading.md`

- [ ] 减少传输体积与减少解析执行成本为什么是两个问题
- [ ] Code Splitting 如何按路由、组件或功能拆分代码
- [ ] dynamic import 如何形成异步 chunk
- [ ] 拆分过细为什么会增加调度、请求和运行时成本
- [ ] Tree Shaking 生效需要哪些静态分析条件
- [ ] CommonJS、动态属性访问和副作用为什么会妨碍 Tree Shaking
- [ ] `sideEffects` 配置错误为什么可能误删代码
- [ ] Polyfill 和语法降级应如何匹配目标浏览器
- [ ] source map、开发代码和调试依赖为什么不应进入生产主包

## P1：高频补充

### 9. 缓存与传输策略 `delivery.md`

- [ ] HTML 与带 content hash 的静态资源为什么采用不同缓存策略
- [ ] Brotli、gzip 和未压缩传输如何选择
- [ ] CDN 缓存、浏览器缓存与 Service Worker 缓存的职责
- [ ] HTTP/2、HTTP/3 下资源合并与域名拆分策略为什么需要重新评估
- [ ] 资源版本更新如何避免 HTML 与旧 chunk 不匹配
- [ ] stale-while-revalidate 适合什么数据和资源
- [ ] 304 仍然需要网络往返意味着什么
- [ ] 缓存命中率和回源率如何观测

### 10. 运行时列表与大量 DOM `largeRendering.md`

- [ ] 大量 DOM 节点为何增加样式计算、布局和内存成本
- [ ] 虚拟列表如何只渲染可视区域
- [ ] 固定高度与动态高度虚拟列表的实现差异
- [ ] overscan 如何在流畅度和渲染量之间权衡
- [ ] 分页、无限滚动、虚拟列表应如何选择
- [ ] DocumentFragment 是否总能带来性能提升
- [ ] 事件委托如何减少大量监听器
- [ ] Canvas、SVG、DOM 在大量图形场景中的取舍

### 11. 内存与泄漏 `memory.md`

- [ ] 可达性和垃圾回收的基本概念
- [ ] 全局引用、闭包、定时器、事件监听器如何意外保留对象
- [ ] detached DOM tree 如何形成
- [ ] Object URL、Worker、Observer 和订阅为什么需要清理
- [ ] 内存持续增长、短期峰值和正常 GC 锯齿如何区分
- [ ] Heap Snapshot、Allocation Timeline、Comparison 视图分别用于什么
- [ ] WeakMap、WeakSet 能解决什么引用生命周期问题
- [ ] 内存泄漏如何最终表现为卡顿、崩溃或页面被系统回收

### 12. 第三方脚本 `thirdParty.md`

- [ ] 统计、广告、客服和 A/B SDK 如何影响网络与主线程
- [ ] async/defer 为什么不能消除第三方脚本的执行成本
- [ ] 第三方脚本失败或超时如何隔离
- [ ] iframe、Worker、服务端转发分别能隔离哪些影响
- [ ] Consent 后加载和按需加载如何减少无效成本
- [ ] 如何统计第三方代码的传输体积、Long Task 和调用次数
- [ ] 自托管第三方资源的收益、更新与合规成本

### 13. CSR、SSR、SSG 与 Hydration `renderingStrategies.md`

- [ ] CSR、SSR、SSG、ISR 对 TTFB、首屏和服务器成本的影响
- [ ] SSR 返回 HTML 为什么不代表页面已经可交互
- [ ] Hydration 需要下载和执行哪些 JavaScript
- [ ] hydration mismatch 为什么会增加工作或导致内容重建
- [ ] streaming SSR 如何缩短内容到达时间
- [ ] selective/partial hydration 与 islands architecture 的基本思路
- [ ] 服务端渲染慢、客户端 bundle 大时可能同时损害哪些指标
- [ ] 应如何按页面内容和交互需求选择渲染策略

### 14. 性能监控与上报 `monitoring.md`

- [ ] PerformanceObserver 可以采集哪些 entry
- [ ] Navigation Timing、Resource Timing、Long Tasks、Event Timing 的用途
- [ ] web-vitals 库与浏览器原始 Performance API 的关系
- [ ] 页面卸载时为什么常使用 `sendBeacon()` 或 keepalive fetch 上报
- [ ] 采样率、会话标识、页面路由和设备维度如何设计
- [ ] SPA 路由切换的指标应如何定义
- [ ] 指标异常如何关联到版本、资源、接口和用户行为
- [ ] 数据清洗、去重、分位数和告警阈值的基本思路

### 15. DevTools 性能分析 `devtools.md`

- [ ] Network 面板如何分析 waterfall、优先级、缓存与响应体积
- [ ] Performance 面板中 Main、Network、Frames、Interactions 轨道如何阅读
- [ ] 火焰图中的 task、调用栈、self time、total time 表示什么
- [ ] 如何识别 Long Task、强制布局、频繁绘制和掉帧
- [ ] Performance Insights、Lighthouse 与手工录制分别适合什么
- [ ] Coverage 如何发现未使用的 JavaScript 和 CSS
- [ ] Layers、Rendering、Memory 面板分别帮助验证什么问题
- [ ] CPU throttling 与 network throttling 如何用于稳定复现

## P2：有余力再学

### 16. Service Worker 与离线缓存 `serviceWorker.md`

- [ ] cache first、network first、stale-while-revalidate 的性能取舍
- [ ] precache 与 runtime cache 的区别
- [ ] Service Worker 启动和 fetch interception 自身有什么成本
- [ ] 缓存版本、清理、配额和更新策略
- [ ] 离线可用与“加载更快”为什么是不同目标
- [ ] 如何避免缓存旧 HTML 导致 chunk 404

### 17. 性能预算与自动化 `performanceBudget.md`

- [ ] 资源体积、请求数量、指标和主线程时间预算的区别
- [ ] 构建时预算与线上 RUM 告警如何配合
- [ ] Lighthouse CI、bundle size check 如何接入 CI
- [ ] 噪声和运行环境差异为什么会让单次分数不可靠
- [ ] 如何设置允许波动范围并识别真实回退
- [ ] 第三方依赖升级如何纳入性能回归检查

## 综合题

- [ ] 针对“首屏慢”建立从指标确认到瓶颈定位的排查流程
- [ ] 将 LCP 拆成四个阶段，并为每个阶段给出可能的优化
- [ ] 分析一次点击响应慢是输入延迟、处理时间还是展示延迟造成的
- [ ] 分析“开发环境流畅，生产页面卡顿”需要采集哪些证据
- [ ] 解释读写 DOM 交错为什么会触发布局抖动并给出修改方案
- [ ] 为首屏图片、非首屏图片和背景图分别设计加载策略
- [ ] 判断一个大体积依赖应 Tree Shake、Code Split、懒加载还是替换
- [ ] 分析一次 CLS 来自图片、字体、异步内容还是动画
- [ ] 使用 Performance 面板定位一个 Long Task 的具体调用来源
- [ ] 设计前端性能监控的指标、维度、采样和告警方案
- [ ] 比较 CSR、SSR、SSG 对一个内容站和后台系统的影响
- [ ] 给出优化前后验证方案，证明收益不是测试波动

## 建议取舍

- 时间较少：完成 P0 的指标、关键渲染路径、主线程和资源加载部分，并掌握 DevTools 基本排查。
- 常规准备：完成 P0、P1，能够围绕 LCP、INP、CLS 给出测量、优化、验证闭环。
- 深入准备：补充 P2，在真实项目中建立一次性能预算和 RUM 监控，不必背诵所有指标 API 字段。
