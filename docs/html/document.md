# 文档结构与解析基础

`<!doctype html>` 让现代浏览器使用 standards mode；缺失或旧 doctype 可能进入 quirks mode，改变盒模型等兼容行为。html 包含 head 与 body，head 保存元数据和资源声明，body 保存页面内容。

void element 如 img、input、meta 没有结束标签。HTML parser 会容错并自动补全/重排部分结构，但生成 DOM 可能与源码直觉不同，尤其是 table、p 和错误嵌套。

“块级/行内元素”是传统默认 display 的简化，不是元素永恒语义；CSS 可改变外部/内部显示类型，但不会改变按钮、标题等语义。

全局属性适用于广泛元素；`data-*` 保存应用私有字符串元数据。hidden 隐藏内容，inert 还阻止子树获得焦点和交互，适合非活动 UI，但都不是授权安全边界。
