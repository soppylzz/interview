# CSS 学习清单

> 用于筛选前端面试中的 CSS 高频知识点。优先级综合考虑提问频率、知识点的基础程度和与实际布局问题的关联。

## 已安排

- [ ] BFC：触发方式、解决外边距折叠和浮动问题、是否会阻止自身被浮动元素覆盖
- [ ] containing block（包含块）：不同定位方式如何确定包含块，百分比尺寸相对谁计算
- [ ] stacking context（堆叠上下文）：创建条件、层叠顺序、`z-index` 失效原因

## P0：建议优先学习

### 1. 盒模型与尺寸计算 `boxModel.md`

- [ ] 标准盒模型与怪异盒模型，`box-sizing` 的区别
- [ ] `width`、`padding`、`border`、`margin` 如何共同决定元素占用空间
- [ ] `width: auto` 与 `width: 100%` 的区别，为什么后者可能溢出
- [ ] `min-width`、`max-width` 与 `width` 冲突时的优先关系
- [ ] `box-sizing: border-box` 为什么常用于全局样式

### 2. 层叠、优先级与继承 `cascade.md`

- [ ] CSS 声明如何经过来源、重要性、层叠层、选择器优先级和源码顺序决出最终值
- [ ] 选择器优先级如何计算；`:is()`、`:not()`、`:where()` 对优先级的影响
- [ ] `!important` 的规则和局限，行内样式如何参与层叠
- [ ] 哪些属性默认继承，`inherit`、`initial`、`unset`、`revert` 的区别
- [ ] 指定值、计算值、使用值和实际值的基本区别
- [ ] `@layer` 解决了什么问题

### 3. `display` 与格式化模型 `display.md`

- [ ] block、inline、inline-block 的区别
- [ ] `display` 的外部显示类型和内部显示类型
- [ ] 行内元素能否设置宽高、内外边距，垂直方向为什么表现特殊
- [ ] `display: none`、`visibility: hidden`、`opacity: 0` 的布局、事件和可访问性差异
- [ ] `display: contents` 的作用和注意事项

### 4. Flex 布局 `flex.md`

- [ ] 主轴、交叉轴以及轴方向如何受 `flex-direction` 影响
- [ ] `justify-content`、`align-items`、`align-content`、`align-self` 的作用对象和生效条件
- [ ] `flex-grow`、`flex-shrink`、`flex-basis` 如何分配剩余空间或收缩空间
- [ ] `flex: 1` 的常见展开值，和 `flex: auto` 的区别
- [ ] flex item 为什么可能无法收缩：自动最小尺寸与 `min-width: 0`
- [ ] `gap`、换行、排序，以及常见等分、两端布局实现

### 5. 定位与常见布局 `position.md`

- [ ] `static`、`relative`、`absolute`、`fixed`、`sticky` 的区别
- [ ] 绝对定位元素的定位参照如何确定
- [ ] `fixed` 为什么有时不再相对视口定位
- [ ] `sticky` 的生效条件和常见失效原因
- [ ] 脱离普通流意味着什么，对父元素和兄弟元素有何影响
- [ ] 水平垂直居中的常见方案及各自适用条件
- [ ] 两栏、三栏、等高和自适应布局的常见实现

### 6. CSS 单位与百分比 `units.md`

- [ ] `px`、`em`、`rem`、`%` 的参照物和使用场景
- [ ] `vw`、`vh` 与移动端动态视口单位 `svh`、`lvh`、`dvh`
- [ ] 百分比 `width`、`height`、`padding`、`margin`、`transform: translate()` 分别相对谁计算
- [ ] `height: 100%` 为什么经常不生效
- [ ] 物理像素、CSS 像素、设备像素比和 1px 边框问题

### 7. 响应式布局 `responsive.md`

- [ ] 媒体查询的写法和常见断点策略
- [ ] 移动优先与桌面优先的区别
- [ ] 流式布局、弹性布局、Grid 布局的选型
- [ ] `min()`、`max()`、`clamp()` 和 `calc()` 的常见用法
- [ ] 容器查询与媒体查询的区别
- [ ] viewport meta 标签的作用

## P1：高频补充

### 8. Grid 布局 `grid.md`

- [ ] 网格轨道、网格线、单元格和区域的概念
- [ ] `fr`、`minmax()`、`repeat()`、`auto-fit`、`auto-fill` 的区别
- [ ] 显式网格与隐式网格
- [ ] item 的定位、对齐和自动放置规则
- [ ] Grid 与 Flex 的适用场景：二维布局与一维布局

### 9. 浮动与清除浮动 `float.md`

- [ ] `float` 最初解决什么问题，浮动元素如何移动
- [ ] 浮动元素是否脱离普通流，对块盒、行盒和文字环绕分别有什么影响
- [ ] 多个浮动元素如何排列，空间不足时如何下移
- [ ] 为什么父元素会发生高度塌陷
- [ ] `clear` 清除的是什么，为什么它不能直接恢复父元素高度
- [ ] 清除浮动的常见方案：额外元素、clearfix、BFC，以及各自原理
- [ ] 现代布局中何时仍适合使用 `float`
- [ ] BFC 为什么不会与浮动元素重叠

### 10. 普通流与外边距折叠 `normalFlow.md`

- [ ] 普通流中的块级盒和行内盒如何排列
- [ ] 相邻块级元素、父子元素和空块的垂直外边距何时折叠
- [ ] 正、负外边距发生折叠时如何计算最终距离
- [ ] 水平外边距为什么不折叠
- [ ] 如何阻止外边距折叠，以及为什么这些方案有效
- [ ] BFC 与外边距折叠、浮动的关系

### 11. 行内格式化与文本溢出 `inlineFormatting.md`

- [ ] 行盒、行高、基线和 `vertical-align` 的关系
- [ ] `line-height` 无单位值、长度值和百分比在继承时的区别
- [ ] 图片底部为什么常出现空隙，如何消除
- [ ] 单行和多行文本溢出省略的实现及限制
- [ ] 长单词和连续字符如何换行：`overflow-wrap`、`word-break`、`white-space`

### 12. 选择器与伪元素 `selector.md`

- [ ] 属性选择器、关系选择器和结构伪类的常见用法
- [ ] `:nth-child()` 与 `:nth-of-type()` 的区别
- [ ] `:first-child` 为什么可能匹配失败
- [ ] `::before`、`::after` 的生成内容、布局方式和限制
- [ ] `:focus-visible`、`:focus-within`、`:has()` 的用途
- [ ] CSS 选择器是否从右向左匹配，以及这对性能的实际意义

### 13. Overflow 与滚动 `overflow.md`

- [ ] `overflow: hidden`、`clip`、`auto`、`scroll` 的区别
- [ ] 什么会创建滚动容器，滚动条为什么可能影响布局宽度
- [ ] `text-overflow` 生效需要哪些条件
- [ ] `overscroll-behavior`、滚动穿透和滚动链
- [ ] `scroll-snap` 的基本使用场景

### 14. 变换、过渡与动画 `animation.md`

- [ ] `transform` 的常用函数、执行顺序和变换原点
- [ ] `transition` 可以对哪些属性生效，`all` 有什么问题
- [ ] CSS Animation 与 Transition 的区别
- [ ] `animation-fill-mode`、`animation-direction`、`animation-play-state`
- [ ] 为什么通常优先动画 `transform` 和 `opacity`
- [ ] 动画如何尊重 `prefers-reduced-motion`

### 15. CSS 变量 `customProperties.md`

- [ ] 自定义属性如何参与层叠和继承
- [ ] `var()` 的回退值何时生效，变量无效时声明会怎样
- [ ] 自定义属性与 Sass/Less 变量的区别
- [ ] 如何用变量实现主题切换
- [ ] `@property` 能解决哪些类型检查、默认值和动画问题

### 16. 替换元素与图片适配 `replacedElement.md`

- [ ] 什么是替换元素，`img`、`input` 与普通元素在尺寸计算上的区别
- [ ] 固有尺寸、固有比例与 `aspect-ratio`
- [ ] `object-fit` 与 `background-size` 的区别
- [ ] 图片保持比例、固定比例容器和防止布局偏移的实现

## P2：有余力再学

### 17. CSS 性能与渲染 `performance.md`

- [ ] 修改哪些属性通常会触发布局、绘制或仅合成
- [ ] 强制同步布局和布局抖动是如何产生的
- [ ] `transform`、`opacity` 动画性能较好的原因及适用边界
- [ ] `will-change` 的作用和滥用代价
- [ ] `contain` 与 `content-visibility` 如何缩小渲染影响范围
- [ ] 与已有 `docs/browser/rendering.md` 联动学习，避免重复整理完整渲染流水线

### 18. CSS containment 与容器查询 `containment.md`

> 这里的 containment 是渲染隔离机制，与 containing block（包含块）不是同一概念。

- [ ] `contain` 的 size、layout、style、paint 隔离分别表示什么
- [ ] `container-type` 为什么会影响尺寸 containment
- [ ] `@container` 的尺寸查询与样式查询
- [ ] 容器查询单位 `cqw`、`cqh`、`cqi`、`cqb`

### 19. 逻辑属性与书写模式 `logicalProperties.md`

- [ ] `inline` 轴、`block` 轴与物理横纵轴的区别
- [ ] `margin-inline`、`padding-block`、`inset-inline-start` 等逻辑属性
- [ ] `writing-mode`、`direction` 对布局和 Flex/Grid 的影响
- [ ] 为什么国际化页面更适合使用逻辑属性

### 20. 字体与 Web Font `font.md`

- [ ] 字体族回退、字重匹配和字体度量
- [ ] `@font-face` 的基本配置与字体格式
- [ ] `font-display` 各取值以及 FOIT、FOUT
- [ ] Web Font 对加载性能和布局偏移的影响
- [ ] `font-size`、`line-height` 与可访问性的关系

### 21. 颜色、背景与绘制效果 `visualEffects.md`

- [ ] `opacity`、带 alpha 的颜色值在子元素继承和堆叠上下文上的区别
- [ ] 多重背景、渐变、`background-size` 与 `background-position`
- [ ] `box-shadow` 与 `filter: drop-shadow()` 的区别
- [ ] `filter`、`backdrop-filter`、`mix-blend-mode` 的基本原理和性能影响
- [ ] `currentColor` 的用途

### 22. CSS 可访问性 `accessibility.md`

- [ ] `:focus-visible` 与键盘焦点样式
- [ ] 颜色对比度以及为什么不能只用颜色传达状态
- [ ] `prefers-reduced-motion`、`prefers-color-scheme`、`forced-colors`
- [ ] CSS 隐藏内容的不同方式对读屏和键盘操作的影响
- [ ] 视觉顺序与 DOM 顺序不一致带来的问题

### 23. 工程化与兼容性 `engineering.md`

- [ ] CSS Reset 与 Normalize.css 的区别
- [ ] BEM、CSS Modules、CSS-in-JS 的基本思路和取舍
- [ ] Sass/Less 的变量、嵌套、mixin 与原生 CSS 能力的区别
- [ ] 浏览器前缀、Autoprefixer、Browserslist 各自解决什么问题
- [ ] 渐进增强、优雅降级和 `@supports`
- [ ] CSS Modules 中的局部作用域是如何实现的

## 综合题

- [ ] 实现水平垂直居中，并说明每种方案的前提和副作用
- [ ] 实现左侧固定、右侧自适应的两栏布局
- [ ] 实现两侧固定、中间自适应的三栏布局
- [ ] 实现等宽、等高、自动换行的卡片列表
- [ ] 分析“设置了 `z-index: 9999` 仍被遮挡”的原因
- [ ] 分析“文本或 flex item 撑破容器”的原因
- [ ] 分析“`position: sticky` 不生效”的原因
- [ ] 分析“`height: 100%` 不生效”的原因
- [ ] 分析“绝对定位或 fixed 元素相对错误对象定位”的原因
- [ ] 从一个具体样式冲突中推导最终生效的 CSS 声明

## 建议取舍

- 时间较少：完成已有三项和 P0，再做综合题。
- 常规准备：完成已有三项、P0、P1，并从 P2 中选择“性能与渲染”和“工程化与兼容性”。
- 深入准备：补充 P2，重点理解概念间的联系，不必背诵低频属性的全部取值。
