# 点击劫持与跨窗口安全

点击劫持把目标页面透明或错位嵌入 iframe，诱导用户在不知情时操作。服务端用 CSP `frame-ancestors` 限制可嵌入来源，旧环境可配合 X-Frame-Options；JavaScript frame-busting 不可靠。

UI redressing 还可欺骗拖拽、键盘或权限操作，因此敏感动作要显示明确上下文、二次确认，并避免可被覆盖的无感操作。

新窗口的 opener 可能被用于反向导航，外链使用 noopener。postMessage 必须指定 targetOrigin，接收端验证 origin、source 和 schema。

iframe sandbox 应从全限制逐项开放；同源内容同时拥有 allow-scripts 和 allow-same-origin 可能移除 sandbox，必须按不可信边界单独 origin 隔离。
