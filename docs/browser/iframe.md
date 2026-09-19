# iframe 与浏览上下文

iframe 创建嵌套 browsing context。同源父子页面可访问彼此 DOM；跨源时只能使用少量窗口导航/引用能力和 `postMessage` 等显式通道。

## sandbox 与权限

空 `sandbox` 启用最严格限制，再通过 token 逐项开放脚本、表单、弹窗、同源身份、下载或顶层导航等能力。对同源 iframe 同时开放 `allow-scripts` 与 `allow-same-origin` 可能让内容移除 sandbox 属性，应理解威胁模型。

`allow` 属性为 iframe 设置 Permissions Policy，控制摄像头、麦克风、全屏等能力；它不能绕过用户权限，也与 sandbox 解决不同层面。

父子页面有独立 document、焦点与事件路径，DOM 事件不会自动跨 iframe 边界冒泡。通信使用 postMessage，并严格校验 targetOrigin、event.origin、source 和消息 schema。

第三方 iframe 的 Cookie/存储可能受 SameSite、第三方限制和分区影响。每个 iframe 还会增加文档、脚本、网络和渲染成本；非首屏内容可考虑 lazy loading，并为尺寸预留空间避免 CLS。
