# 浏览器存储

浏览器存储不是统一数据库。Cookie 参与 HTTP，Web Storage 是同步键值存储，IndexedDB 是异步事务数据库；容量和清理策略由浏览器、设备、配额与隐私模式决定，不应背成固定数字。

## 1. 能力对比

| 方案 | 生命周期与作用域 | API | 适用场景 |
| --- | --- | --- | --- |
| Cookie | 按 host/domain、path 等规则，过期或会话结束 | 字符串；请求时自动携带 | 会话标识、少量服务端状态 |
| localStorage | 通常跨同源页面持久保存 | 同步字符串 API | 少量非敏感偏好 |
| sessionStorage | origin + 顶层浏览上下文的页面会话 | 同步字符串 API | 单标签页流程状态 |
| IndexedDB | origin 下的持久数据库 | 异步事务 API | 大量结构化数据、离线数据 |

localStorage/sessionStorage 在主线程同步读写和序列化，大对象或频繁操作会卡顿。IndexedDB 支持 object store、index、transaction 和结构化克隆，更适合大量数据。

## 2. Cookie 属性

| 属性 | 含义 |
| --- | --- |
| `Domain` | 指定可接收 Cookie 的 host 范围；省略时为 host-only |
| `Path` | 控制请求路径匹配，不是可靠安全边界 |
| `Expires` | 绝对过期时间 |
| `Max-Age` | 相对存活秒数，通常优先于 Expires |
| `Secure` | 只在安全传输条件下发送 |
| `HttpOnly` | 禁止 `document.cookie` 访问，Cookie 仍会随匹配请求发送 |
| `SameSite` | 控制跨站请求携带，常见 Strict、Lax、None |

`SameSite=None` 通常必须同时设置 `Secure`。SameSite 判断的是 site，不完全等同于 origin。`__Host-` 等 Cookie prefix 可以强化 Secure、Path 和 Domain 约束。

HttpOnly 能降低会话 Cookie 被脚本直接窃取的风险，但 XSS 仍可借用户会话发请求。Cookie 鉴权还需 CSRF 防护、过期、轮换和服务端撤销。

## 3. session、Cookie 与 Token

session 是服务端状态模型，常把随机 session ID 放入 Cookie；Cookie 是浏览器存储和传输机制；token 是凭证格式。三者不在同一分类层级。

把 access token 放 localStorage 可避免自动随请求发送，但会暴露给同源 JavaScript，XSS 时可被读取。放 HttpOnly Cookie 可阻止读取，却需要考虑 CSRF。选型应围绕攻击面和应用架构，而不是“哪种存储绝对安全”。

## 4. sessionStorage 的细节

sessionStorage 由 origin 和顶层 browsing context 分区。同一标签页中的同源 iframe 可访问对应 origin 的存储。通过 opener 打开的新标签页可能先复制 opener 的 sessionStorage，之后两边独立修改；使用 `noopener` 可切断 opener 关系。

## 5. 隔离、第三方与清理

Web Storage 和 IndexedDB 通常按 origin 隔离，Cookie 的 host/domain 规则不同。现代浏览器会限制第三方 Cookie，并越来越多使用存储分区；用户清理数据、隐私模式、配额回收都可能让持久数据消失。

应用必须把客户端存储视为可丢失缓存：处理 quota/error、设计版本迁移、提供过期和登出清理。敏感密钥不应因为“只存本地”就被视为安全。
