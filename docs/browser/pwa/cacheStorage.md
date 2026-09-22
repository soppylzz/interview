# Cache Storage

Cache Storage 是由 JavaScript 管理的 `Request` / `Response` 存储。它常与 Service Worker 配合实现离线访问，但 API 也可在受支持的 window 环境中使用。

它不是 HTTP cache 的脚本接口：应用需要自行决定何时写入、如何命中、何时更新和删除。存进 Cache Storage 的响应不会因为 `max-age` 到期而自动触发 HTTP revalidation。

## 1. 数据模型

```text
CacheStorage（全局入口 caches）
  ├─ static-v3（命名 Cache）
  │    ├─ Request -> Response
  │    └─ Request -> Response
  └─ api-v1（命名 Cache）
       └─ Request -> Response
```

- `caches.open(name)` 打开或创建一个命名 `Cache`。
- `cache.match(request)` 查找匹配的 response。
- `cache.put(request, response)` 写入或替换条目。
- `cache.delete(request)` 删除条目。
- `caches.keys()` 和 `caches.delete(name)` 用于版本清理。

`Cache.put()` 只接受 GET request；它保存的是一次响应副本，不是任意方法请求的持久队列。离线写操作需要另行设计 IndexedDB 队列和服务端幂等协议。

Cache Storage 的匹配规则以 `Request` 为中心，并提供 `ignoreSearch`、`ignoreMethod` 和 `ignoreVary` 等选项。改变默认规则前要确认业务语义；例如忽略 query string 可能把两个不同接口结果当成同一份数据。

## 2. 怎么用：read-through 示例

下面的函数先查 Cache Storage，未命中时请求网络并保存成功响应：

```js
async function readThroughCache(input) {
  const request = new Request(input)
  const cache = await caches.open("api-v1")
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  const networkResponse = await fetch(request)

  if (networkResponse.ok) {
    await cache.put(request, networkResponse.clone())
  }

  return networkResponse
}
```

`Response` 的 body 是 stream，只能被消费一次。`cache.put()` 会消费传入 response 的 body，因此还要把原响应返回给调用方时，必须先调用 `clone()`。

这段代码只是最小示例，并没有解决超时、过期、离线 fallback、用户隔离或并发更新。实际策略通常放在 Service Worker 的 `fetch` 事件中，详见 [`serviceWorker.md`](./serviceWorker.md)。

## 3. 预缓存与版本清理

应用可以按版本建立静态资源缓存：

```js
const CACHE_NAME = "static-v3"
const STATIC_URLS = ["/", "/app.css", "/app.js"]

async function precache() {
  const cache = await caches.open(CACHE_NAME)
  await cache.addAll(STATIC_URLS)
}

async function removeOldCaches() {
  const names = await caches.keys()
  const outdatedNames = names.filter((name) => name !== CACHE_NAME)
  await Promise.all(outdatedNames.map((name) => caches.delete(name)))
}
```

给缓存命名加版本不会自动删除旧版本。Service Worker 项目常在 `install` 阶段预缓存，在 `activate` 阶段删除明确属于本应用的旧缓存。删除前必须限制名称范围，避免误删同一 origin 下其他模块的数据。

`cache.addAll()` 具有批量预缓存的便利性，但任一请求失败会使整个操作 reject。对非关键资源，可以逐项请求并记录失败，而不是让可选资源阻断安装。

## 4. 新鲜度需要由应用定义

Cache Storage 不会解析响应头并自动淘汰 stale entry。常见做法包括：

- 把版本写进 cache name，随部署整体切换。
- 给业务数据附加写入时间，在读取时判断是否过期。
- 使用 stale-while-revalidate：立即返回缓存，同时在后台获取并写入新响应。
- 让网络请求继续遵循 HTTP cache，再把最终 response 保存到 Cache Storage。

如果接口包含用户数据，缓存 key 和清理时机还必须考虑账号切换。仅用 URL 作为 key 可能让同一浏览器上的下一个登录用户读到上一个用户的响应。

## 5. Response 类型与限制

- 跨 origin 的 `no-cors` 请求可能产生 opaque response；脚本看不到其状态、headers 和 body，但仍可把它作为整体缓存和返回。
- `Cache` 不保证实现统一的自动容量上限或 LRU 行为；写入可能因配额不足失败。
- 缓存是 origin 数据，用户清理站点数据或浏览器回收时可能消失。
- Cache Storage 只在安全上下文中提供；可用性还应通过 `"caches" in globalThis` 检测。

配额与持久化策略见[存储管理](../storage/storageManagement/README.md)。

## 6. 与 HTTP cache 的关系

```text
页面 / Service Worker
        │
        ├─ cache.match() -> Cache Storage（完全由脚本决定）
        │
        └─ fetch()       -> HTTP 请求链路（可能使用 HTTP cache）
```

`fetch()` 命中 HTTP cache 后得到的 response 可以再写入 Cache Storage。因此一次请求可能同时经过两层机制，但两层的命中、更新和清理规则彼此独立。

## 7. 兼容性与降级

Cache Storage 在现代浏览器中已广泛提供，但要求安全上下文，并可能受隐私模式和浏览器策略影响。使用前做能力检测；不支持时回退到普通网络请求：

```js
async function loadResource(url) {
  if (!("caches" in globalThis)) {
    return fetch(url)
  }

  return readThroughCache(url)
}
```

详细兼容性见 [MDN：CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage#browser_compatibility) 与 [MDN：Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache#browser_compatibility)。

## 8. 参考资料

- [Service Workers specification：CacheStorage](https://w3c.github.io/ServiceWorker/#cachestorage-interface)
- [MDN：Using the Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [MDN：Response.clone()](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone)
