# Back/Forward Cache（BFCache）

BFCache 在用户离开页面时，尝试保存完整页面及其 JavaScript heap、DOM 和运行状态；用户通过浏览器前进或后退返回时，可以直接恢复快照。它优化的是历史导航，不是普通刷新，也不是 HTTP response 的缓存。

## 1. 与 HTTP cache 的区别

| 对比项       | BFCache                        | HTTP cache                   |
| ------------ | ------------------------------ | ---------------------------- |
| 保存对象     | 整个页面运行状态               | 单个 HTTP response           |
| 主要触发场景 | 前进、后退                     | 导航和资源请求               |
| 恢复结果     | 原页面继续运行                 | 用缓存 response 重新构建页面 |
| 应用控制     | 浏览器决定是否存入；页面可适配 | HTTP 头可明确控制复用规则    |

如果页面没有进入 BFCache，后退导航仍可能借助 HTTP cache 加快资源加载，但页面会重新执行初始化流程。这两种情况在用户感受上可能接近，生命周期却不同。

## 2. pageshow 与 pagehide

使用 `pageshow` / `pagehide` 观察页面被恢复或离开。`event.persisted` 表示事件是否与 BFCache 页面有关：

```js
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    refreshTimeSensitiveData()
  }
})

window.addEventListener("pagehide", (event) => {
  if (event.persisted) {
    pauseTransientWork()
  }
})
```

BFCache 恢复后，内存中的数据可能已经过时。例如库存、登录状态和协作数据都可能在页面冻结期间改变。应在 `pageshow` 的 BFCache 分支中重新验证时效性强的数据，而不是无条件重建整个应用。

更完整的页面状态转换见 [`pageLifecycle.md`](../api/pageLifecycle.md)。

## 3. 不要依赖 unload

`unload` 在移动端等场景本来就不可靠，并会影响一些浏览器对 BFCache 的判断。需要保存状态或暂停工作时，优先使用 `visibilitychange`、`pagehide` 等生命周期信号，并让保存操作可重复执行。

```js
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveDraftLocally()
  }
})
```

不要把“收到某个离开事件”当成数据已经成功上传的保证。关键数据应尽早保存到合适的本地存储，网络同步则设计重试机制。

## 4. 可恢复性由浏览器决定

页面是否进入 BFCache 取决于浏览器实现、页面使用的 API、响应策略和当时资源状况。某些阻碍因素可以由页面修复，另一些则是浏览器策略或资源压力造成的。

因此应遵循两条原则：

- 正确性不能依赖一定命中 BFCache；正常重载路径也必须工作。
- 不要维护一张永远不变的“禁用 API 清单”，应以目标浏览器当前文档和 DevTools 诊断为准。

Chromium 在支持的环境中提供 `PerformanceNavigationTiming.notRestoredReasons`，用于解释主文档为何没有从 BFCache 恢复：

```js
const [navigationEntry] = performance.getEntriesByType("navigation")

if (navigationEntry?.type === "back_forward") {
  console.log(navigationEntry.notRestoredReasons)
}
```

该诊断接口不能作为业务逻辑依赖，并且兼容性有限；使用前应进行能力检测。

## 5. 测试方法

1. 打开页面并产生一些可观察状态，例如输入未提交文本。
2. 点击同标签页内的链接离开，再使用浏览器后退。
3. 检查输入状态是否恢复，并在 `pageshow` 中记录 `event.persisted`。
4. 在 Chromium DevTools 的 Application 面板运行 Back/forward cache 测试，查看阻碍原因。
5. 同时测试未命中后的完整初始化路径。

开发者工具本身、扩展和打开的连接可能影响测试结果，应尽量在接近真实用户的环境复核。

## 6. 可运行 Demo

[同目录的 `index.ts`](index.ts) 同时提供一个 BFCache 实验页：运行 `node docs/browser/cache/index.ts`，打开 `http://localhost:5003/bfcache`，页面显示本次执行的 ID、内存计数器、未提交草稿与生命周期日志：

1. 在草稿框输入文本、点几次计数器，然后前往中间页 `/between`，再按浏览器「后退」返回。
2. BFCache 命中：`pageshow` 的 `event.persisted` 为 `true`，执行 ID、计数器、草稿与日志原样保留，服务器终端没有出现任何新请求——整页快照恢复，连 HTTP cache 都没有参与。
3. BFCache 未命中：出现一次全新的初始化（执行 ID 变化），`persisted` 为 `false`；此时文档与图片才重新走 HTTP cache（终端出现条件请求）。Chromium 下可用 `notRestoredReasons` 查看原因，页面上会直接打印。
4. 打开 `/bfcache?unload=1` 注册 `unload` 监听后重复上面的步骤，对比部分浏览器因此不进入 BFCache 的行为差异。

> Chrome 在 DevTools 打开时可能禁用 BFCache，导致后退总是未命中；可关闭 DevTools 后观察页面内日志，或在 Application 面板用 Back/forward cache 测试按钮诊断。点击中间页链接后再返回，页面内的历史日志原样可见本身就是「DOM 被快照」的直接证据。

## 7. 兼容性

主流浏览器支持 BFCache，但可缓存条件和具体实现不同。`pageshow`、`pagehide` 的兼容性较好；`notRestoredReasons` 需要单独检测。详见 [MDN：bfcache](https://developer.mozilla.org/en-US/docs/Glossary/bfcache)、[MDN：pageshow](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event#browser_compatibility) 和 [MDN：notRestoredReasons](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/notRestoredReasons#browser_compatibility)。

## 8. 面试回答框架

先说明 BFCache 保存的是页面快照，只服务于前进/后退；再用 `pageshow.persisted` 解释恢复检测；最后说明页面恢复后要重新验证时效数据，而且命中与否由浏览器决定。若追问与 HTTP cache 的区别，强调后者保存 response，页面仍可能重新初始化——可引用[本目录 demo](#6-可运行-demo) 的对照实验：命中时终端零请求，未命中时文档与图片才重新协商。

## 9. 参考资料

- [web.dev：Back/forward cache](https://web.dev/articles/bfcache)
- [HTML Standard：the `pageshow` event](https://html.spec.whatwg.org/multipage/browsing-the-web.html#event-pageshow)
- [Chrome Developers：Back/forward cache](https://developer.chrome.com/docs/web-platform/bfcache)
