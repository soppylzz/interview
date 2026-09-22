# HTTP 缓存与 BFCache 实验

主题笔记：`httpCache.md`（HTTP 缓存策略）与 `bfcache.md`（往返缓存），共享一个实验服务。

## 运行方式

```bash
node docs/browser/cache/index.ts
```

端口 `:5003`，两个实验页：

- `/` — 缓存策略实验：五个资源分别使用不同的 `Cache-Control` 与验证器组合；服务器端版本号可手动升级以触发 `200` 与 `304` 的切换，页面内置 `fetch` `cache` 模式探测。
- `/bfcache` — BFCache 实验：辅助页 `/between`、`?unload=1` 阻断开关、`pageshow.persisted` 与 `notRestoredReasons` 上报。
