# CSR、SSR、SSG 与 Hydration

CSR 由客户端获取数据和生成界面，服务器简单但首屏依赖 JS；SSR 每次请求生成 HTML，可更早显示内容但增加服务端工作；SSG 构建时生成，CDN 交付快但内容更新需重建；ISR 在静态交付与增量更新之间折中。

SSR 返回 HTML 只代表内容可见。事件逻辑仍需客户端下载、解析、执行并 hydration，完成前用户可能看到却无法操作。bundle 过大或主线程繁忙会同时损害 LCP 后的 INP。

hydration mismatch 来自时间、随机数、环境分支或服务端/客户端数据不同，可能触发警告、额外 DOM 修改甚至重建。渲染输入应可复现，并传递一致初始数据。

streaming SSR 分段发送已完成内容和 Suspense 边界，缩短部分内容到达时间。selective/partial hydration 只优先激活需要交互的区域；islands 让静态页面中的少数交互岛分别加载。

内容站通常偏 SSG/SSR 和少量客户端 JS；登录后的高交互后台可用 CSR 或混合方案。选择要同时评估内容更新频率、个性化、SEO、交互密度、服务器预算和缓存能力。
