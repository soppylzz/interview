前端八股可以按“基础 → 浏览器/网络 → 框架 → 工程化/性能 → 手写/算法 → 项目场景”六层来补。下面给你一张可勾选总览，按求职性价比排序；校招/初级重前四层，中高级再加框架原理、工程化、场景题。

## 一、JavaScript 基础（最高频，先补）

- 数据类型：基本类型 String/Number/Boolean/Null/Undefined/Symbol/BigInt；引用类型；typeof/instanceof/Array.isArray/Object.prototype.toString 判断边界
- 变量与作用域：var/let/const 区别、变量提升、TDZ、块级作用域、作用域链
- this：默认/隐式/显式/new/箭头函数五类绑定；call/apply/bind 差异
- 闭包：定义、词法作用域、私有变量/缓存/防抖节流应用、内存泄漏与释放
- 原型与继承：prototype/**proto**、原型链查找、class extends、Object.create、手写 new/instanceof
- 异步：回调→Promise→Generator→async/await；Promise 状态机、then/catch/finally、all/race/allSettled/any；事件循环、宏任务（script/setTimeout/setInterval/I/O/UI）/微任务（Promise.then/queueMicrotask/MutationObserver）执行顺序
- ES6+：解构、模板串、默认参数、剩余/展开、模块化 import/export、Set/Map、Proxy/Reflect、可选链?.、空值合并??、迭代器/生成器
- 其他：深浅拷贝（JSON 法缺陷、递归处理循环引用/Symbol/Date/RegExp）、垃圾回收（标记清除/引用计数、闭包/定时器/DOM 引用泄漏）

## 二、CSS / HTML（中频但容易拖后腿）

- 盒模型：content-box/border-box、margin/padding/border；*box-sizing:border-box 实践
- 选择器与优先级：!important＞行内＞id＞类/属性/伪类＞标签＞通配；:is/:where:has 新特性作加分
- 布局：Flex（主轴/交叉轴、flex:1 含义）、Grid（二维、repeat/auto-fit/minmax）、position 五值、sticky；水平垂直居中多种方案
- BFC/层叠上下文：形成条件、解决外边距合并/浮动塌陷/层级遮挡
- 重排重绘合成：改几何→reflow，改颜色→repaint，transform/opacity→composite；批量 DOM、用 transform 替代 top/left
- 响应式：媒体查询、rem/vw/vh/clamp、移动端 1px、viewport、容器查询（加分）
- HTML：语义化 header/nav/main/article/section/footer、SEO、表单/无障碍 ARIA、HTML5 新特性（Web Storage/WebSocket/Web Worker/Canvas）

## 三、浏览器原理（中高级分水岭）

- 输入 URL 到渲染：DNS→TCP 三次握手→TLS（HTTPS）→请求/响应→解析 HTML 建 DOM→CSSOM→Render Tree→Layout→Paint→Composite
- 渲染优化：关键渲染路径、SSR/SSG 对首屏的帮助、白屏排查
- 缓存：强缓存 Cache-Control/Expires，协商缓存 Last-Modified/ETag，304 流程
- 存储：localStorage/sessionStorage/cookie（4K、带请求）/IndexedDB 差异
- 跨域：同源策略、CORS 预检、JSONP（仅 GET）、Nginx/ devServer 代理、postMessage、WebSocket
- 安全：XSS（存储/反射/DOM、转义/CSP）、CSRF（同源凭证、token/samesite/double submit）、点击劫持/CSP

## 四、网络 / HTTP（几乎必问一点）

- 状态码：1xx/2xx/3xx/4xx/5xx，301/302/304/401/403/404/500/502/503 场景
- HTTP 演进：1.0 短连接、1.1 长连接/管线/缓存、2.0 二进制帧/多路复用/HPACK/服务端推送、3.0 QUIC/UDP
- HTTPS：对称/非对称加密、证书、TLS 握手、与 HTTP 区别
- TCP/UDP：三次握手、四次挥手、为什么三次/为什么TIME_WAIT；UDP 适用直播/QUIC
- 请求方法：GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS；RESTful 与表单提交差异
- 鉴权：Cookie+Session、JWT 存储与刷新、OAuth2 基础（中高级）

## 五、框架（按投递岗位二选一深、另一浅）

**React**

- 虚拟 DOM 与 Fiber：reconciliation、可中断渲染、双缓存树
- Hooks：useState/useEffect/useLayoutEffect/useMemo/useCallback/useRef/useReducer；为什么顶层调用、闭包陷阱、依赖数组
- 状态管理：Redux（thunk/saga/toolkit）、Zustand、Jotai、Context 适用边界
- 性能：memo、key、懒加载 React.lazy、并发 useTransition/useDeferredValue、Virtual list
- 路由/SSR：React Router、Next.js App/Pages Router、Server Components（中高级）

**Vue**

- 响应式：Vue2 Object.defineProperty 缺陷，Vue3 Proxy+Reflect 依赖收集/派发更新；computed/watch 区别
- 编译与 diff：模板编译、静态提升、PatchFlags；双端/双指针 diff、key 作用
- 组合式：Options vs Composition、setup、生命周期、provide/inject
- 状态与路由：Vuex vs Pinia、Vue Router 动态路由/懒加载、Nuxt3 SSR（中高级）
- 通用：组件通信（props/emit/v-model/attrs/slots/总线/状态库）、v-model 原理、nextTick

## 六、工程化与构建（中级以上必补）

- 模块化：CommonJS vs ESM、tree-shaking 前提、动态 import
- Webpack：entry/output/loader/plugin、babel 转译、code splitting、HMR、持久化缓存、打包体积分析
- Vite：ESM 原生开发、esbuild/rollup、HMR、按需加载、与 Webpack 差异；Turbopack/Rolldown/esbuild 了解趋势
- 质量与协作：TypeScript 类型/泛型/条件类型/工具类型、ESLint/Prettier、Git 分支/rebase/PR、CI/CD、monorepo（中高级）
- 微前端：qiankun/Module Federation、沙箱、样式隔离、应用通信（大厂中高级常问）

## 七、性能优化（所有岗位都问“你项目怎么优化”）

- 加载：代码分割、路由懒加载、图片懒加载/WebP/AVIF、CDN、preload/prefetch、HTTP2、压缩 gzip/brotli、缓存策略
- 渲染：减少重排重绘、虚拟列表、requestAnimationFrame、content-visibility、关键 CSS、骨架屏
- 指标：LCP/CLS/INP（原 FID）、TTFB、FCP；Lighthouse/Performance/Web Vitals 排查
- 运行：防抖节流、离屏计算、Web Worker、内存泄漏排查、长任务拆分
- 监控：错误上报、白屏检测、性能埋点、Sentry（中高级加分）

## 八、手写代码（笔试/现场高频）

- 基础：debounce/throttle、deepClone（含循环引用/Symbol/特殊对象）、call/apply/bind、new、instanceof、curry、compose
- 异步：Promise 实现核心、Promise.all/race/allSettled/any、retry 请求重试、并发限制（pLimit）
- 数据：数组去重/扁平化/分组、LRU、大数相加、发布订阅、事件委托
- 算法：快排/归并、二分、链表反转/环检测、树遍历、TOPK、动态规划入门（前端一般中等难度）

## 九、项目与场景题（决定能否拿中高级）

用 STAR 准备：背景—职责—方案—量化结果。常问：

- 首屏从 X 秒优化到 Y 做了什么（路由懒加载+骨架屏+图片+缓存+SSR）
- 十万条列表不卡（虚拟滚动/分页/Web Worker 计算）
- 白屏/卡顿排查闭环（Performance+网络+内存+源码）
- 复杂表单/富文本/可视化大屏难点
- 跨团队协作、规范、CI、监控、微前端落地

## 十、按时间的补齐顺序（可直接照做）

- 3 天突击：JS 闭包/原型/this/事件循环 → Promise/async → 浏览器渲染/缓存/跨域 → 一种框架原理+1 个手写套餐
- 1 周系统：加 CSS 布局/BFC、HTTP/HTTPS、框架 diff/状态管理、工程化 Webpack/Vite、性能 Lighthouse、项目 STAR 重写
- 2 周冲中高级：加源码级（响应式/Fiber）、微前端、监控、TS、算法每周 5–10 题、模拟面试复述

如果你愿意，我可以按“投 React 还是 Vue、校招还是社招、还剩几天”再压缩成每日背诵清单和每题标准回答模板。
