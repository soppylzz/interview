# Script、Style 与资源声明

普通 classic script 阻塞 parser；async 下载完成即执行；defer 在解析后按序执行；module 默认类似 defer，并加载依赖图，module 上 defer 无效果。

stylesheet 参与渲染阻塞。preload 提前加载当前页关键资源，modulepreload 提前处理模块图，preconnect 建连；错误 hint 会争抢带宽或重复请求。

crossorigin 决定 CORS 请求与错误/资源共享行为，integrity 用 hash 验证外部资源内容，referrerpolicy 控制 Referer 信息。SRI 还要求跨源响应满足相应 CORS 条件。

noscript 为禁用/不支持脚本环境提供内容。base 会改变全部相对 URL，动态插入或位置错误可能带来导航与安全问题。
