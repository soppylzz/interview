# 链接与导航

有 href 的 a 表示导航，button 表示当前页面操作。`target="_blank"` 打开新上下文；现代浏览器通常提供 opener 防护，但显式 `rel="noopener"` 能表达意图，`noreferrer` 还抑制 Referer。

download 提示下载，跨源和响应头可能限制行为。相对 URL 基于 document base URL 解析；base 元素会改变整页链接、表单和资源的解析，应谨慎使用。

fragment 导航定位 id，并影响 URL/历史；目标焦点行为需在 SPA 和自定义滚动中验证。链接文字应能脱离上下文理解，避免大量“点击这里”。

不要用阻止默认行为的空链接模拟按钮，这会破坏复制链接、打开新标签和辅助技术语义。
