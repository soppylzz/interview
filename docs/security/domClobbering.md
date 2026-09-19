# DOM Clobbering 与浏览器特性攻击

带 id/name 的元素可能作为 Window、Document 或 form 的命名属性暴露，攻击者注入标记后可把代码期望的对象替换为元素或集合，这叫 DOM clobbering。

当代码依赖 `window.config || {}`、form.property 或全局 id，再把结果传入 URL/HTML sink 时，clobbering 可成为 XSS gadget。

防御是使用模块局部变量、显式 querySelector/getElementById 后校验类型、避免命名属性查找，并对输入做 sanitizer。CSP 降低最终脚本执行影响。

mutation XSS 利用 sanitizer 输出在浏览器重新解析/序列化后改变结构。不要自写 sanitizer，应使用持续维护且针对目标上下文测试的实现。
