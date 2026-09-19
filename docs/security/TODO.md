# Frontend Security 学习清单

> 用于筛选前端面试中的 Web 安全知识。重点理解攻击成立条件、信任边界和分层防御，避免只背攻击名称。

## 内容边界

- OAuth、OIDC、JWT 与 Token 生命周期放在 `docs/auth`。
- 同源策略、CORS、Cookie 和 iframe 基础放在 `docs/browser`。
- TLS、DNS 与 HTTP 协议放在 `docs/network`。
- 本目录讨论通用 Web 攻击、防御和前端供应链安全。

## P0：建议优先学习

### 1. Web 安全模型 `securityModel.md`

- [ ] asset、threat、vulnerability、risk 的区别
- [ ] trust boundary 与 attack surface
- [ ] 同源、站点、origin 和安全上下文
- [ ] 认证、授权、输入校验和输出编码的边界
- [ ] defense in depth 与 least privilege
- [ ] 前端校验为什么不是安全边界

### 2. XSS `xss.md`

- [ ] stored、reflected、DOM-based XSS
- [ ] source、propagation、sink
- [ ] HTML、attribute、URL、JavaScript、CSS context
- [ ] 输出编码为什么必须匹配上下文
- [ ] innerHTML、document.write、eval 等危险 sink
- [ ] 框架转义能防御什么，escape hatch 带来什么风险
- [ ] HttpOnly 为什么只能降低部分影响

### 3. CSRF `csrf.md`

- [ ] CSRF 成立需要哪些条件
- [ ] Cookie 自动携带与 ambient authority
- [ ] SameSite Strict、Lax、None 的作用和限制
- [ ] synchronizer token、double submit cookie
- [ ] Origin/Referer 校验
- [ ] simple request 与预检为什么不是完整 CSRF 防御
- [ ] login CSRF 和普通业务 CSRF

### 4. CSP 与 Trusted Types `csp.md`

- [ ] CSP 是纵深防御而不是输入校验替代品
- [ ] default-src、script-src、style-src、connect-src、frame-ancestors
- [ ] nonce、hash 与 strict-dynamic
- [ ] report-only、report-to 和上线流程
- [ ] unsafe-inline、unsafe-eval 的风险
- [ ] Trusted Types 如何限制 DOM XSS sink
- [ ] CSP 常见兼容与第三方脚本问题

### 5. Cookie、Session 与 Token 安全 `sessionSecurity.md`

- [ ] Secure、HttpOnly、SameSite、Domain、Path
- [ ] session fixation、session hijacking、logout 与撤销
- [ ] access token 存在 localStorage 与 Cookie 的攻击面
- [ ] refresh token rotation 与重放检测
- [ ] 短生命周期和最小权限
- [ ] 与 `docs/auth/sessionAndToken.md` 如何配合

### 6. 点击劫持与跨窗口安全 `clickjacking.md`

- [ ] 点击劫持如何利用透明 iframe
- [ ] CSP frame-ancestors 与 X-Frame-Options
- [ ] window.opener 与 reverse tabnabbing
- [ ] postMessage 的 origin、source 和消息校验
- [ ] iframe sandbox 的权限组合风险
- [ ] UI redressing 不只包含点击

## P1：高频补充

### 7. CORS、安全边界与跨源隔离 `crossOriginSecurity.md`

- [ ] CORS 为什么是读取授权而非认证
- [ ] ACAO 回显与 `Vary: Origin`
- [ ] credentialed request 的限制
- [ ] CORP、COOP、COEP 分别保护什么
- [ ] cross-origin isolation 与 SharedArrayBuffer
- [ ] Spectre 如何影响浏览器隔离设计的理解

### 8. URL、跳转与导航安全 `urlSecurity.md`

- [ ] open redirect 的危害
- [ ] javascript:、data: 与不可信 URL
- [ ] URL parser 与字符串前缀判断陷阱
- [ ] allowlist 与规范化顺序
- [ ] referrer 中的敏感信息
- [ ] deep link、callback URL 和 OAuth redirect URI

### 9. 文件上传与下载安全 `fileSecurity.md`

- [ ] MIME、扩展名和 magic bytes 为什么都不能单独信任
- [ ] 文件名、路径穿越和覆盖风险
- [ ] SVG/HTML 文件的主动内容
- [ ] 上传大小、压缩炸弹与处理隔离
- [ ] Content-Disposition、nosniff 与下载
- [ ] Object URL 的生命周期和风险

### 10. 原型污染与对象注入 `prototypePollution.md`

- [ ] `__proto__`、constructor.prototype 污染路径
- [ ] 深合并、query parser 和动态属性写入
- [ ] 污染如何转化为 XSS、权限或配置绕过
- [ ] allowlist、无原型对象、Map 和安全合并
- [ ] Object.freeze 为什么不是完整防御

### 11. 第三方脚本与供应链 `supplyChain.md`

- [ ] typosquatting、dependency confusion、账号接管
- [ ] lockfile、完整性校验和最小发布内容
- [ ] install script 与构建环境秘密
- [ ] Subresource Integrity 的作用和限制
- [ ] CDN、tag manager、浏览器扩展的信任边界
- [ ] SBOM、provenance 和依赖审计

### 12. 前端秘密与加密误区 `frontendSecrets.md`

- [ ] 客户端 bundle 为什么不能保存秘密
- [ ] 环境变量前缀不是安全隔离
- [ ] 混淆、压缩和编码不等于加密
- [ ] 浏览器端加密能解决什么问题
- [ ] 密钥派生、随机数和 Web Crypto 使用边界
- [ ] TLS 与应用层加密的职责

### 13. WebSocket 与实时通信安全 `realtimeSecurity.md`

- [ ] WebSocket 握手与 Origin 校验
- [ ] cookie 鉴权下的跨站 WebSocket 劫持
- [ ] 消息级授权和 schema 校验
- [ ] 重连、重放、速率限制和资源耗尽
- [ ] 日志和错误信息泄漏

## P2：有余力再学

### 14. DOM Clobbering 与浏览器特性攻击 `domClobbering.md`

- [ ] 命名元素如何影响全局和表单属性
- [ ] DOM clobbering 与 XSS gadget
- [ ] 显式查询、局部变量和 CSP
- [ ] mutation XSS 与 sanitizer 边界

### 15. 安全响应头 `securityHeaders.md`

- [ ] HSTS、nosniff、Referrer-Policy
- [ ] Permissions-Policy
- [ ] CSP、COOP、COEP、CORP
- [ ] Cache-Control 与敏感数据
- [ ] 旧安全头和现代替代方案

### 16. 安全测试与事件响应 `securityTesting.md`

- [ ] threat modeling 与 abuse case
- [ ] SAST、DAST、SCA 的区别
- [ ] 浏览器 DevTools 和代理工具的检查范围
- [ ] 自动扫描为什么不能替代人工验证
- [ ] 漏洞分级、修复、回归和披露
- [ ] 安全事件中的令牌撤销和版本回滚

## 综合题

- [ ] 分析一段 innerHTML 数据流是否构成 XSS
- [ ] 为 Cookie Session 设计 CSRF 防御
- [ ] 设计从 Report-Only 到强制执行的 CSP 上线方案
- [ ] 分析 postMessage 与 iframe 集成的信任边界
- [ ] 判断 access token 存储方案的主要攻击面
- [ ] 排查依赖升级引入的前端供应链风险
- [ ] 说明 CORS 成功为什么不等于接口安全

## 建议取舍

- 时间较少：完成 P0，重点掌握 XSS、CSRF、CSP 和会话安全。
- 常规准备：完成 P0、P1，并结合实际页面画出信任边界。
- 深入准备：补充 P2，使用 OWASP 测试方法完成一次安全审查。
