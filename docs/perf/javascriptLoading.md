# JavaScript 资源加载

压缩传输体积改善网络时间，但解压后的代码仍需解析、编译和执行。低端设备上，小而复杂的脚本也可能成为主线程瓶颈，因此要同时观察 transfer size 和 CPU trace。

## 拆分与裁剪

dynamic import 形成异步 chunk。路由级拆分通常最容易匹配用户路径，重组件或低频功能可进一步懒加载。拆分过细会增加请求、模块运行时、调度和加载状态，也可能让共享 chunk 阻塞多个页面。

Tree Shaking 依赖静态 ESM 和可证明无副作用的代码。CommonJS、动态属性访问、顶层副作用会迫使构建器保守保留。错误的 `sideEffects: false` 可能把 CSS 或注册代码删掉，必须以生产行为验证。

语法降级和 polyfill 应匹配实际目标浏览器，避免给现代用户发送无用代码。生产构建应排除测试工具、开发分支和调试依赖；source map 可作为独立或 hidden artifact 上传监控平台，不必进入主包传输。

发现大依赖时依次判断：能否 Tree Shake 未用部分、能否移到低频 chunk、是否仅在交互后加载、是否有更小替代；用 analyzer 和运行时 trace 验证，而不是只看包名大小。
