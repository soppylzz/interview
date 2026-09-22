# Service Worker 与 PWA

Service Worker 注册后经历 installing、waiting、activating、activated。新 worker 通常等待旧 worker 不再控制页面才激活；页面首次注册时也不会立刻被当前加载中的 worker 控制。

它可拦截作用域内受控页面的 fetch，并用 Cache API 实现 cache first、network first、stale-while-revalidate 等策略。Cache API 不自动遵循 HTTP freshness，需要应用自行版本化、过期和清理；网络请求内部仍可利用 HTTP cache。Cache Storage 的数据模型与示例见 [`cacheStorage.md`](./cacheStorage.md)。

Service Worker 能代理敏感请求并长期影响页面，所以只允许安全上下文（localhost 是开发例外）。worker 可随时被浏览器终止，事件中的异步工作必须交给 `event.waitUntil()` 等生命周期机制，不能依赖内存常驻。

更新脚本被检测到变化后安装新版本，但旧标签页可能仍由旧版控制。`skipWaiting()` 和 `clients.claim()` 能加速接管，也可能让一个页面同时运行旧前端代码和新缓存策略，应配合版本协议和刷新提示。

Web App Manifest 描述名称、图标、启动方式和显示模式；可安装性规则由浏览器/平台决定。Manifest 不等于离线，离线也不必然要求安装。测试首次访问、离线、升级、旧标签页和缓存回滚五条路径。
