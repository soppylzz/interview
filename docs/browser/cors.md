# 同源策略与跨域

origin 由 scheme、host、port 三元组决定。任一不同即为跨源；路径不参与同源判断。

```text
https://example.com:443/a
```

同源策略限制脚本读取跨源响应、访问跨源窗口 DOM 和使用部分存储能力。它并不阻止页面向其他源发送所有请求，也不阻止 `<img>`、`<script>` 等按各自规则嵌入资源。

## 1. CORS 解决什么问题

CORS 由服务器通过响应头授权浏览器把跨源响应暴露给调用脚本。请求往往已经到达服务器；缺少授权时，浏览器阻止 JavaScript 读取响应。因此 CORS 不是身份认证，也不能替代 CSRF 防护和服务端授权。

## 2. 简单请求与预检

满足 CORS-safelisted method、header 和 Content-Type 等条件的请求可直接发送，再检查响应头。常见 safelisted method 是 GET、HEAD、POST；Content-Type 仅限特定表单媒体类型及参数规则。

其他请求先发送 OPTIONS preflight，询问目标源是否允许 method、headers 和 credentials 模式相关访问。常见触发因素包括 PUT/DELETE、自定义请求头、`Authorization`，或 `application/json` Content-Type。

预检成功可用 `Access-Control-Max-Age` 缓存，但浏览器有自己的上限。预检缓存与普通 HTTP response cache 不是同一概念。

## 3. 常见响应头

| Header | 作用 |
| --- | --- |
| `Access-Control-Allow-Origin` | 允许的调用 origin，或无凭证场景的 `*` |
| `Access-Control-Allow-Methods` | 预检允许的方法 |
| `Access-Control-Allow-Headers` | 预检允许的请求头 |
| `Access-Control-Allow-Credentials` | 是否允许浏览器向脚本暴露凭证模式响应 |
| `Access-Control-Expose-Headers` | 允许脚本读取的非 safelisted 响应头 |
| `Access-Control-Max-Age` | 预检结果缓存时间 |

动态回显 Origin 时必须校验白名单，并通常返回 `Vary: Origin`，避免共享缓存把一个 origin 的授权响应复用于另一个 origin。

## 4. 携带凭证

客户端 fetch 需要设置合适的 `credentials`，XHR 使用 `withCredentials`。服务端必须返回明确的 `Access-Control-Allow-Origin`，不能使用 `*`，并返回 `Access-Control-Allow-Credentials: true`。

即使 CORS 允许，Cookie 仍受 Domain、Path、Secure、SameSite、第三方 Cookie 策略和存储分区限制。CORS 成功不保证 Cookie 一定发送。

```js
const response = await fetch('https://api.example.com/me', {
  credentials: 'include',
})
```

## 5. 常见方案边界

- JSONP 利用 classic script 可跨源加载，只支持 GET，依赖目标返回可执行脚本，现代 API 不推荐。
- 反向代理让浏览器只访问同源服务，由服务器转发请求；它改变了浏览器观察到的 origin。
- `postMessage` 用于不同窗口/iframe 间传递结构化消息，不是 HTTP 请求跨域方案。
- WebSocket 建连使用 Origin 等服务端校验机制，不沿用普通 fetch CORS 流程。

## 6. 排查流程

先看 Console 与 Network：是否发出 OPTIONS、预检响应状态、请求 method/header、最终响应 ACAO、credentials 以及重定向。不要通过关闭浏览器安全策略来“修复”；Postman/curl 不执行浏览器同源策略，所以成功只能证明服务端网络可达。
