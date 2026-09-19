# Browser 学习清单

> 用于筛选前端面试中的浏览器高频知识点。优先级综合考虑提问频率、知识点的基础程度以及与前端日常开发的关联。

## 已安排

### 事件循环 `eventLoop.md`

- [ ] 浏览器进程、网络进程、渲染进程和 GPU 进程的职责
- [ ] 进程与线程的区别，以及多进程架构的优缺点
- [ ] 渲染主线程承担的任务，以及 JavaScript 为什么通常在该线程执行
- [ ] 任务队列、微任务队列和一次事件循环的执行过程
- [ ] `Promise`、计时器、用户交互等任务的执行顺序
- [ ] 微任务与浏览器渲染时机的关系
- [ ] `setTimeout` 为什么不能精准计时
- [ ] 补充 `queueMicrotask()` 和微任务饥饿问题

### 浏览器渲染 `rendering.md`

- [ ] HTML 解析、样式计算、布局、分层、绘制、分块、光栅化和合成
- [ ] DOM、CSSOM、渲染树和 Layout Tree 的关系
- [ ] 重排、重绘和合成的区别
- [ ] 强制同步布局与布局抖动
- [ ] 渲染主线程、合成线程、光栅线程与 GPU 进程如何协作
- [ ] `transform` 和 `opacity` 为什么通常可以跳过布局与绘制
- [ ] 合成层的产生和 `will-change` 的作用

### 浏览器缓存 `cache.md`

- [ ] 强缓存与协商缓存的判断流程
- [ ] `Cache-Control`、`Expires`、`ETag`、`Last-Modified` 的作用和优先级
- [ ] `no-cache`、`no-store`、`max-age`、`s-maxage`、`immutable` 的区别
- [ ] `200 (from memory cache)`、`200 (from disk cache)` 与 `304` 的区别
- [ ] 刷新、强制刷新、地址栏访问对缓存的影响
- [ ] HTML、带 hash 的静态资源如何设计缓存策略
- [ ] HTTP 缓存与 Service Worker Cache API、浏览器后退前进缓存的区别

### 同源策略与跨域 `cors.md`

- [ ] 同源的判定规则，以及同源策略限制了哪些能力
- [ ] CORS 简单请求与预检请求的区别
- [ ] 触发预检的条件以及预检结果如何缓存
- [ ] `Access-Control-Allow-Origin` 等常见响应头的作用
- [ ] 携带凭证时客户端和服务端分别需要什么配置
- [ ] 为什么 CORS 是浏览器限制，而不是服务端无法收到请求
- [ ] JSONP、反向代理、`postMessage` 等方案分别解决哪类跨域问题

### 浏览器存储 `store.md`

- [ ] Cookie、`localStorage`、`sessionStorage`、IndexedDB 的容量、生命周期和访问方式
- [ ] Cookie 的 `Domain`、`Path`、`Expires`、`Max-Age`、`Secure`、`HttpOnly`、`SameSite`
- [ ] Cookie、session 和 token 的关系
- [ ] `localStorage` 为什么可能阻塞主线程
- [ ] `sessionStorage` 的作用域以及复制标签页时的行为
- [ ] IndexedDB 适合什么场景
- [ ] 浏览器存储的同源隔离、第三方 Cookie 限制和清理策略

## P0：建议优先学习

### 1. 从输入 URL 到页面展示 `navigation.md`

- [ ] URL 解析、HSTS、缓存、DNS、建立连接、发送请求、接收响应到渲染的完整流程
- [ ] DNS 查询与缓存发生在哪些层级
- [ ] TCP、TLS 和 HTTP 在该流程中的职责；具体协议细节放入 `docs/network`
- [ ] 浏览器如何处理重定向、状态码和响应头
- [ ] 获取 HTML 后，预加载扫描器和主解析器如何协作
- [ ] 页面发生跨站导航时，浏览器进程和渲染进程如何配合
- [ ] 地址栏输入内容为什么不一定直接作为 URL 访问

### 2. DOM 事件机制 `domEvent.md`

- [ ] 捕获、目标、冒泡三个阶段的执行顺序
- [ ] `event.target` 与 `event.currentTarget` 的区别
- [ ] `stopPropagation()`、`stopImmediatePropagation()`、`preventDefault()` 的区别
- [ ] 事件委托的原理、优点和不适用场景
- [ ] `addEventListener` 中 `capture`、`once`、`passive`、`signal` 的作用
- [ ] 哪些事件不冒泡，如何处理 focus、mouseenter 等场景
- [ ] 浏览器默认行为、合成事件与可信事件的基本区别

### 3. HTML 解析与资源加载 `resourceLoading.md`

- [ ] HTML 解析遇到 CSS、普通脚本、图片时分别会发生什么
- [ ] CSS 是否阻塞 HTML 解析、页面渲染和 JavaScript 执行
- [ ] 普通 `<script>`、`async`、`defer`、`type="module"` 的下载和执行差异
- [ ] 动态插入脚本与静态脚本的行为差异
- [ ] `DOMContentLoaded` 与 `load` 的触发条件
- [ ] preload、prefetch、preconnect、dns-prefetch 的区别
- [ ] 浏览器如何确定资源优先级，以及资源提示为什么可能被浪费

## P1：高频补充

### 4. 页面生命周期 `pageLifecycle.md`

- [ ] `document.readyState` 的变化过程
- [ ] `DOMContentLoaded`、`load`、`pageshow`、`pagehide` 的区别
- [ ] `visibilitychange` 与 `beforeunload`、`unload` 的适用场景
- [ ] 页面进入后台后，计时器、动画和网络任务可能受到什么限制
- [ ] 页面冻结、丢弃和恢复时如何保存状态
- [ ] 为什么不应依赖 `unload` 完成关键数据上报
- [ ] `navigator.sendBeacon()` 适合解决什么问题

### 5. History、导航与 BFCache `history.md`

- [ ] `location.assign()`、`replace()`、`reload()` 的区别
- [ ] `history.pushState()`、`replaceState()`、`popstate` 如何实现前端路由
- [ ] hash 路由与 history 路由的区别
- [ ] 浏览器前进、后退和普通重新加载有何不同
- [ ] BFCache 保存了什么，恢复页面时为什么可能不重新执行脚本
- [ ] 哪些行为会影响页面进入 BFCache
- [ ] `pageshow` 的 `persisted` 如何判断 BFCache 恢复

### 6. Web Worker 与主线程通信 `worker.md`

- [ ] Dedicated Worker、Shared Worker、Service Worker 的定位和生命周期
- [ ] Worker 能访问哪些 Web API，为什么不能直接操作 DOM
- [ ] `postMessage` 使用结构化克隆时有什么成本
- [ ] Transferable Objects 与 SharedArrayBuffer 解决什么问题
- [ ] 什么计算适合放到 Worker，什么情况收益可能小于通信成本
- [ ] Worker 与主线程错误处理、终止和资源释放

### 7. Service Worker 与 PWA `serviceWorker.md`

- [ ] Service Worker 的注册、安装、激活和控制页面过程
- [ ] Service Worker 为什么要求安全上下文
- [ ] `fetch` 事件与 Cache API 如何实现离线访问
- [ ] cache first、network first、stale-while-revalidate 等缓存策略
- [ ] Service Worker 更新为何容易出现旧版本仍在运行的问题
- [ ] Web App Manifest、可安装性与离线能力的基本关系
- [ ] Service Worker 缓存与 HTTP 缓存如何配合

### 8. 页面间通信 `crossContextCommunication.md`

- [ ] 同源页面通过 `BroadcastChannel`、`storage` 事件和 Shared Worker 通信
- [ ] 父子窗口、iframe 如何使用 `postMessage`
- [ ] `postMessage` 为什么必须校验 `origin` 和消息结构
- [ ] `window.opener` 的用途和窗口引用关系
- [ ] `MessageChannel` 适合什么场景
- [ ] 不同通信方案的同源限制、通信范围和生命周期

### 9. 浏览器调度 API `scheduling.md`

- [ ] `requestAnimationFrame()` 的执行时机，以及与 `setTimeout()` 的区别
- [ ] `requestIdleCallback()` 的执行时机、`IdleDeadline`、`timeRemaining()` 和 `timeout`
- [ ] 为什么不能依赖 `requestIdleCallback()` 执行必须完成的任务，以及不支持时如何降级
- [ ] `queueMicrotask()` 与 `Promise.then()` 调度微任务的差异
- [ ] `scheduler.postTask()`、`scheduler.yield()` 的优先级调度思路、特性检测及降级方案
- [ ] 如何使用时间切片拆分长任务，并防止微任务饥饿
- [ ] 页面进入后台后，计时器和调度 API 会受到什么限制
- [ ] 动画更新、普通任务、低优先级任务分别应选择哪个 API

### 10. Observer API `observer.md`

- [ ] MutationObserver、IntersectionObserver、ResizeObserver 分别观察什么
- [ ] 为什么 Observer 通常比轮询或频繁读取布局更合适
- [ ] MutationObserver 回调与微任务的关系，以及适合观察哪些 DOM 变化
- [ ] IntersectionObserver 的 root、rootMargin、threshold
- [ ] ResizeObserver 的观察尺寸、循环限制和常见使用场景
- [ ] 懒加载、曝光统计、无限滚动和元素尺寸响应分别选择哪个 Observer

### 11. 常用 Web API `webApi.md`

- [ ] Web API 与 JavaScript 语言本身、浏览器宿主环境的关系
- [ ] AbortController 如何统一取消请求、事件监听和其他异步操作
- [ ] `URL`、`URLSearchParams`、`structuredClone()` 等常用工具 API
- [ ] Blob、File、FileReader、Object URL 的关系和使用场景
- [ ] FormData 如何组织表单与文件数据
- [ ] `matchMedia()` 如何在 JavaScript 中监听媒体查询变化
- [ ] `navigator.onLine` 和 online、offline 事件为什么不能直接证明网络可用
- [ ] Clipboard、Fullscreen、Web Share 等 API 为什么通常要求用户激活或权限
- [ ] Geolocation、Notification 等能力的基本调用模式和失败处理
- [ ] 学习每个 API 时记录执行上下文、生命周期、兼容性和降级方案

### 12. iframe 与浏览上下文 `iframe.md`

- [ ] iframe 的同源访问限制
- [ ] `sandbox` 不同权限令牌的作用
- [ ] `allow` 与 Permissions Policy 控制什么能力
- [ ] iframe 与父页面之间的导航、焦点和事件关系
- [ ] iframe 如何通过 `postMessage` 安全通信
- [ ] 第三方 iframe 对 Cookie、存储和性能的影响

## P2：有余力再学

### 13. DOM 与 CSSOM `dom.md`

- [ ] DOM 节点、元素、属性与 HTML Collection 的基本关系
- [ ] `querySelector`、`getElementById` 等查询结果和适用场景
- [ ] live collection 与 static NodeList 的区别
- [ ] 属性 attribute 与 DOM property 的区别
- [ ] `innerHTML`、`textContent`、`innerText` 的差异
- [ ] DocumentFragment、template 与批量 DOM 更新
- [ ] 读取布局属性为什么可能触发强制同步布局

### 14. Web Components 与 Shadow DOM `webComponents.md`

- [ ] Custom Elements、Shadow DOM、HTML Template 各自解决什么问题
- [ ] Shadow DOM 的样式隔离边界
- [ ] slot 如何分发外部内容
- [ ] 事件如何穿过 Shadow DOM，`composedPath()` 有什么作用
- [ ] open 与 closed shadow root 的区别
- [ ] Web Components 与框架组件的关系和取舍

### 15. 浏览器兼容与特性检测 `compatibility.md`

- [ ] 特性检测与 UA 检测的区别
- [ ] polyfill、ponyfill、transpile 分别解决什么问题
- [ ] CSS `@supports` 与 JavaScript 能力检测
- [ ] 渐进增强与优雅降级
- [ ] Browserslist、Babel、Autoprefixer 在兼容链路中的分工
- [ ] 浏览器前缀产生的原因，以及为什么不应手工猜测前缀

## 综合题

- [ ] 完整说明从输入 URL 到首屏展示经历的过程
- [ ] 写出包含同步代码、Promise、计时器和 `requestAnimationFrame` 的执行顺序
- [ ] 设计 HTML 与带 hash 静态资源的缓存策略
- [ ] 分析“接口在 Postman 中成功，在浏览器中跨域失败”的原因
- [ ] 比较 Cookie、`localStorage`、`sessionStorage`、IndexedDB 的适用场景
- [ ] 说明 `requestAnimationFrame()`、`requestIdleCallback()` 和微任务的执行时机
- [ ] 为一个可取消的异步任务选择合适的 Web API
- [ ] 设计两个标签页、父子 iframe 和 Worker 之间的通信方案
- [ ] 分析页面后退时数据和脚本状态与预期不一致是否由 BFCache 引起

## 建议取舍

- 时间较少：完成五个已有主题和 P0，再练习综合题。
- 常规准备：完成已有主题、P0、P1；重点串联 URL 导航、资源加载、事件循环和渲染流程。
- 深入准备：补充 P2；Web API 重点掌握适用场景和执行时机，不必背诵全部方法。
