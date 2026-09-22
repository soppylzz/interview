# History、导航与 BFCache

`location.assign(url)` 导航并增加历史记录，`replace(url)` 替换当前记录，`reload()` 重新加载当前 URL。它们都可能触发完整文档导航。

`history.pushState(state, '', url)` 新增同文档历史记录，`replaceState` 替换当前记录；二者不会立即发起网络请求，也不会触发 `popstate`。用户前进/后退激活其他同文档记录时触发 popstate，路由器据此恢复 UI。

hash 路由改变 fragment，通常触发 `hashchange` 且无需服务端 fallback；history 路由 URL 更自然，但直接访问任意路径时服务器必须返回应用入口。

## BFCache

前进后退缓存可能保存整个 Document、JavaScript heap 和渲染状态。恢复时不会重新执行初始化脚本，也不等同于 reload，因此 WebSocket、时间和数据可能已经过期。

```js
window.addEventListener('pageshow', event => {
  if (event.persisted) refreshStaleData()
})
```

不可缓存原因随浏览器演进，常见风险包括 unload handler、某些未完成资源或不允许冻结的能力。应通过 Chrome DevTools BFCache 检查原因，而不是维护静态黑名单。

`pagehide` 适合暂停和保存，`pageshow` 适合恢复与复验。普通 reload 创建新文档；历史遍历可能使用 BFCache 或重新加载，代码必须兼容两条路径。
