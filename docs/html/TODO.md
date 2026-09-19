# HTML 学习清单

> 用于筛选前端面试中的 HTML、语义化、表单和可访问性知识。重点理解元素语义和浏览器默认行为，而不是背诵全部标签。

## 内容边界

- HTML parser、资源阻塞与渲染流程放在 `docs/browser`。
- 布局、样式和 CSS 可访问性放在 `docs/css`。
- 加载性能和媒体优化放在 `docs/perf`。
- XSS、CSP 与不可信 HTML 放在 `docs/security`。

## P0：建议优先学习

### 1. 文档结构与解析基础 `document.md`

- [ ] doctype、html、head、body 的作用
- [ ] standards mode 与 quirks mode
- [ ] void element 与可省略标签
- [ ] block/inline 为什么不应当作所有元素的固定语义分类
- [ ] 全局属性、data-*、hidden、inert
- [ ] HTML 容错为什么不代表错误结构没有影响

### 2. 语义化 HTML `semantics.md`

- [ ] header、nav、main、article、section、aside、footer
- [ ] section 与 div 如何选择
- [ ] heading 层级与文档结构
- [ ] button、a、div 的交互语义差异
- [ ] time、address、figure、figcaption
- [ ] 语义化对可访问性、SEO 和维护的影响

### 3. 表单基础 `form.md`

- [ ] form action、method、enctype、target
- [ ] input type 与移动端键盘、原生能力
- [ ] label、fieldset、legend 的作用
- [ ] name、value、disabled、readonly、required
- [ ] submit button 与 Enter 提交
- [ ] GET 表单、URL 编码和 multipart/form-data

### 4. 表单校验与提交 `formValidation.md`

- [ ] Constraint Validation API
- [ ] validity、checkValidity、reportValidity、setCustomValidity
- [ ] input、change、submit、formdata 事件
- [ ] `preventDefault` 与真实提交
- [ ] FormData 如何处理同名字段、文件和 disabled 控件
- [ ] 客户端校验为什么不能替代服务端校验

### 5. HTML 可访问性基础 `accessibility.md`

- [ ] accessible name、role、state 的基本概念
- [ ] 键盘顺序、焦点可见性和焦点管理
- [ ] 原生控件为什么优先于自造控件
- [ ] alt、label、caption 和 heading
- [ ] `tabindex` 的 0、-1 与正数风险
- [ ] WCAG 的 perceivable、operable、understandable、robust

### 6. ARIA `aria.md`

- [ ] ARIA 不会自动增加行为
- [ ] role、aria-label、aria-labelledby、aria-describedby
- [ ] aria-expanded、selected、checked、live
- [ ] landmark 与 widget pattern
- [ ] 隐藏内容的 aria-hidden、hidden、inert 差异
- [ ] no ARIA is better than bad ARIA 的含义

## P1：高频补充

### 7. 链接与导航 `link.md`

- [ ] a 的 href、target、download、rel
- [ ] `noopener`、`noreferrer`、opener
- [ ] 相对 URL 与 base URL
- [ ] fragment navigation 与跳转焦点
- [ ] button 与链接的选择

### 8. 图片与响应式资源 `image.md`

- [ ] img 的 src、alt、width、height、loading、decoding
- [ ] srcset、sizes、picture、source
- [ ] art direction 与 resolution switching
- [ ] figure/figcaption 的语义
- [ ] 空 alt 与缺少 alt 的区别

### 9. 音视频与字幕 `media.md`

- [ ] audio、video、source、track
- [ ] controls、autoplay、muted、preload、poster
- [ ] 自动播放限制
- [ ] captions、subtitles、descriptions
- [ ] media event 与 Promise-based play

### 10. 表格与列表 `structuredContent.md`

- [ ] ul、ol、dl 的适用场景
- [ ] table、caption、thead、tbody、th、td
- [ ] scope、headers 与复杂表格可访问性
- [ ] 为什么不使用 table 做页面布局
- [ ] 列表语义与 CSS display 的关系

### 11. Metadata 与 SEO `metadata.md`

- [ ] title、meta description、charset、viewport
- [ ] canonical、robots、hreflang
- [ ] Open Graph 与社交分享元数据
- [ ] structured data 的基本作用
- [ ] CSR、SSR 与 crawler 可见性的关系
- [ ] SEO 为什么不等于只添加 meta 标签

### 12. Script、Style 与资源声明 `resources.md`

- [ ] script 的 async、defer、module、nomodule
- [ ] link stylesheet、preload、modulepreload、preconnect
- [ ] crossorigin、integrity、referrerpolicy
- [ ] noscript 的用途
- [ ] base 元素为什么可能改变全部相对 URL

## P2：有余力再学

### 13. Dialog、Popover 与交互元素 `interactive.md`

- [ ] dialog 的 show、showModal、close
- [ ] modal focus、Esc 和 backdrop
- [ ] popover 的声明式交互
- [ ] details/summary 的适用场景
- [ ] 自造弹窗常遗漏哪些可访问性行为

### 14. Template 与 Web Components 入口 `template.md`

- [ ] template content 为什么初始不渲染
- [ ] cloneNode 与节点身份
- [ ] slot 与 declarative shadow DOM
- [ ] custom element 命名与升级过程
- [ ] 与 `docs/browser/webComponents.md` 的边界

### 15. HTML 安全边界 `htmlSecurity.md`

- [ ] innerHTML 与 textContent 的差异
- [ ] 不可信 URL、HTML 与 attribute context
- [ ] iframe sandbox 和 allow 的基本职责
- [ ] referrerpolicy 与敏感 URL
- [ ] 表单自动填充与 autocomplete token

## 综合题

- [ ] 为登录表单设计语义、校验、自动填充和错误提示
- [ ] 判断一组 button、a、div role=button 的行为差异
- [ ] 为响应式首屏图片设计 picture/srcset/sizes
- [ ] 分析弹窗的焦点进入、循环、关闭和恢复
- [ ] 说明语义化如何影响屏幕阅读器、键盘和 SEO

## 建议取舍

- 时间较少：完成 P0，重点掌握语义化、表单和可访问性。
- 常规准备：完成 P0、P1，并用真实键盘和辅助功能树验证页面。
- 深入准备：补充 P2，重点掌握现代原生交互元素。
