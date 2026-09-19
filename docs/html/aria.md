# ARIA

ARIA 为缺少原生语义的界面补充 role、name、state 和 relationship，不会自动增加点击、键盘、焦点或样式行为。能用原生元素时优先原生。

`aria-label` 直接给名称，`aria-labelledby` 引用可见文本，`aria-describedby` 提供补充描述。`aria-expanded/selected/checked` 必须随真实状态同步；错误状态比缺失状态更糟。

`aria-live` 宣布动态信息，应控制 politeness 和频率，避免每次输入都打断。`aria-hidden` 从可访问性树隐藏内容，却不一定阻止焦点；hidden/display:none/inert 的视觉和交互效果不同。

复杂 widget 应遵循 WAI-ARIA Authoring Practices 的键盘模式。添加 `role="button"` 后仍需实现 Enter/Space、焦点和 disabled 行为。
