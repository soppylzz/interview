# HTML 解析与资源加载

HTML 可以边下载边解析。图片通常不阻塞 parser；样式表通常不阻塞 parser，却会阻塞渲染，并可能让依赖样式的经典脚本等待。普通经典脚本会暂停 parser，等待下载并执行。

## Script 模式

| 写法 | 下载 | 执行 |
| --- | --- | --- |
| 普通 classic script | 阻塞 parser 等待 | 立即执行后继续解析 |
| `async` classic | 与解析并行 | 下载完成即执行，顺序不保证 |
| `defer` classic | 与解析并行 | 解析结束后按文档顺序、DOMContentLoaded 前 |
| module script | 模块图并行加载 | 默认类似 defer；依赖和 TLA 会影响完成 |
| `async` module | 模块图并行加载 | 可用后尽快执行 |

module 上的 defer 没有效果。动态创建的 script 默认行为与 parser-inserted script 不同，可通过属性控制；用 `innerHTML` 插入的 script 通常不会执行，不能笼统说“动态脚本都 async”。

`DOMContentLoaded` 等待文档解析和 defer/module script 执行完成，不等待普通图片；`load` 等待页面及多数依赖资源完成。async script 可能在 DOMContentLoaded 前或后执行。

## Resource Hint

- preload：当前页面很快必需的明确资源。
- modulepreload：提前加载并处理模块。
- prefetch：可能用于未来导航的低优先级资源。
- preconnect：提前建立到 origin 的连接。
- dns-prefetch：只提前 DNS。

浏览器结合资源类型、发现位置、fetchpriority 和内部策略安排优先级。hint 只是提示；错误的 URL、`as`、CORS 模式或过量 preload 会重复下载或抢占真正关键资源。用 Network waterfall 验证发现和优先级。
