# 语义化 HTML

语义元素表达内容角色：nav 是主要导航，main 是页面主要内容，article 可独立分发，section 是有主题的章节，aside 是补充内容。没有合适语义时才使用 div。

section 通常应有可识别标题；标题级别表达层级，不应只因字号选择 h1-h6。一个页面应让键盘和辅助技术快速定位 main、navigation、heading。

链接用于导航到资源，button 用于执行操作。给 div 添加 click 不能自动获得键盘、焦点、disabled、表单和无障碍语义。

figure/figcaption 组合可独立引用的图表和说明；time 的 datetime 提供机器可读值；address 表示相关作者/组织联系信息。语义化改善默认行为、可访问性、SEO 和维护，但不能替代清晰内容结构。
