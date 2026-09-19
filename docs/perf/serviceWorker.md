# Service Worker 与离线缓存

Service Worker 位于页面和网络之间，可拦截 fetch。cache first 延迟低但更新慢；network first 内容新但受网络影响；stale-while-revalidate 先返回缓存并后台更新，适合允许短暂旧内容的资源。

precache 在安装/激活阶段准备构建时已知资源；runtime cache 根据真实请求逐步写入。二者都要定义缓存名、版本、最大条目、过期和清理策略，并处理存储配额不足。

SW 本身有启动和事件分发成本，首次访问在安装并控制页面前也未必加速。离线可用强调断网行为，加载更快强调正常网络路径，两者目标相关但不相同。

## 更新安全

新的 worker 通常先 waiting，再在合适时机接管。立即 `skipWaiting` 可能让旧页面突然由新策略控制，应配合版本消息和刷新体验。

不要长期缓存入口 HTML 同时清除其引用的旧 hash chunk。安全发布顺序是先提供新旧静态资源、再更新 HTML/SW，激活后清理确认不再需要的旧 cache；导航请求还需准备离线 fallback 和网络错误处理。

调试时在 Application 面板检查 worker 生命周期和 Cache Storage，并测试首次访问、更新、离线、旧标签页和缓存损坏五条路径。
