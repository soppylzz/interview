# HTML 安全边界

`textContent` 把输入当文本，`innerHTML` 把输入交给 HTML parser；不可信 HTML 必须使用经过维护的 sanitizer，并结合 CSP/Trusted Types，不能靠删除 script 标签。

安全处理依赖上下文：HTML 文本、attribute、URL、CSS 和 JavaScript 的编码规则不同。设置 href/src 前应使用 URL API 解析并限制允许的 scheme/origin。

iframe sandbox 默认施加限制，allow/Permissions Policy 控制特定能力；错误组合可能削弱隔离。它们不是把任意恶意内容变安全的单一开关。

Referrer-Policy 可减少 URL 中敏感路径/参数泄漏。敏感数据本就不应放 URL。autocomplete token 能帮助密码管理器和用户正确填写；无差别关闭 autocomplete 往往降低安全与可用性。
