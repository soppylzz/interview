# 浏览器 HTTP 缓存

HTTP 缓存保存响应，并按请求、响应头和缓存状态判断能否复用。常说的“强缓存”和“协商缓存”是教学分类，对应 fresh response 直接复用，以及 stale/要求验证时向服务器 revalidate。

## 1. 判断流程

```text
请求能否匹配缓存条目？
  ├─ 否 → 网络请求并按响应指令决定是否存储
  └─ 是 → 当前是否 fresh 且允许直接使用？
           ├─ 是 → 直接使用缓存响应
           └─ 否 → 携带 validator 重新验证
                    ├─ 304 → 复用缓存 body 并更新元数据
                    └─ 200 → 使用并可能保存新响应
```

缓存 key 至少包含请求方法和 URL，并可能受 `Vary` 指定的请求头、分区缓存等机制影响。

## 2. 新鲜度与存储指令

| 指令 | 含义 |
| --- | --- |
| `max-age=N` | 响应生成后 N 秒内通常视为 fresh |
| `s-maxage=N` | 针对 CDN/代理等 shared cache，优先于 max-age |
| `no-cache` | 可以存储，但复用前必须验证 |
| `no-store` | 缓存不应存储该响应 |
| `private` | 仅 private cache 可存储 |
| `public` | 明确允许 shared cache 存储符合条件的响应 |
| `immutable` | fresh 期间内容不会改变，避免不必要验证 |

`Expires` 给出绝对过期时间；存在适用的 `Cache-Control: max-age` 时以后者为准。客户端与服务器时钟可能不同，因此现代服务更常使用 max-age。

`no-cache` 不等于“不缓存”，`no-store` 才是禁止存储的核心指令。敏感响应还要结合 private、身份隔离和服务端策略，不能只靠一个 header 推导安全性。

## 3. Validator

服务器可返回：

- `ETag`：资源版本标识，客户端用 `If-None-Match` 验证。
- `Last-Modified`：最后修改时间，客户端用 `If-Modified-Since` 验证。

若两种 validator 同时可用，条件请求通常优先使用 ETag 语义。服务器确认内容未变时返回 304，不带新的完整 body；它仍发生了网络往返。

## 4. Memory、Disk 与 304

- `200 (from memory cache)`：本进程内存中的缓存响应，生命周期通常较短。
- `200 (from disk cache)`：持久缓存响应，读取慢于内存但可跨导航复用。
- `304 Not Modified`：访问了服务器，服务器允许复用本地 body。

DevTools 的文字是浏览器实现和调试展示，不是 HTTP 标准定义的三种状态。

## 5. 刷新行为

普通导航、刷新、强制刷新对请求 cache mode 的处理可能不同；DevTools 的 Disable cache 也会改变结果。通常普通刷新会要求验证部分资源，强制刷新会绕过或重新验证更多缓存，但具体 header 与内存缓存行为不应作为跨浏览器保证。

## 6. 实际策略

HTML 入口需要较快获得新版本，可使用 `no-cache` 或较短 max-age 并配 validator。文件名带 content hash 的 JS、CSS、图片内容变化即换 URL，可使用：

```http
Cache-Control: public, max-age=31536000, immutable
```

部署时先上传新 hash 资源，再切换 HTML，并暂时保留旧资源，避免旧页面或缓存 HTML 请求到已删除 chunk。

## 7. 三种不同缓存

- HTTP cache 按 HTTP 语义自动工作。
- Service Worker Cache API 是脚本可编程的 Request/Response 存储，不自动遵循 HTTP 新鲜度规则。
- BFCache 保存整个页面的内存快照，用于前进后退恢复，不是资源响应缓存。

排查时同时看 Network 的 request/response headers、Size、from cache 标记和 Service Worker，不能只看状态码。
