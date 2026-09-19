# XSS

XSS 让攻击者控制的数据在受信任 origin 中作为代码执行。Stored XSS 持久保存 payload，Reflected XSS 从请求反射，DOM XSS 在客户端 source 到 dangerous sink 的数据流中产生。

防御核心是使用安全 DOM API和按上下文输出编码。HTML 文本、attribute、URL、JavaScript 字符串和 CSS 需要不同规则；不存在一次通用 escape。

innerHTML、outerHTML、insertAdjacentHTML、document.write、eval/Function 等是高风险 sink。需要富文本时使用成熟 sanitizer，限制配置并在依赖升级后回归。

框架默认文本插值通常转义，但 dangerouslySetInnerHTML/v-html、动态 URL、第三方组件和服务端模板仍可能绕过。CSP/Trusted Types 是纵深防御。HttpOnly 只阻止直接读 Cookie，XSS 仍能以用户身份发请求和修改页面。
