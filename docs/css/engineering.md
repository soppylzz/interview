# CSS 工程化与兼容性

> CSS 工程化解决全局作用域、命名冲突、复用、依赖关系、兼容目标和长期维护问题。

## 1. Reset 与 Normalize

- Reset：主动移除大量 user-agent 默认样式，从统一起点重建。
- Normalize：保留有价值默认样式，同时修正浏览器差异和常见不一致。

现代项目通常根据设计系统编写小型 base layer，而不是无差别清空所有语义元素样式。

## 2. BEM

```text
block__element--modifier
```

BEM 用命名表达组件、组成部分和变体，适合全局 CSS 中降低冲突。它不提供真正作用域，仍需团队约束；过深 DOM 结构不应直接映射为冗长 class 链。

## 3. CSS Modules

CSS Modules 在构建时把局部 class 名映射为唯一标识，并由 JavaScript import mapping：

```js
import styles from "./button.module.css"
```

局部作用域来自构建转换，不是浏览器原生 CSS scope。全局 selector、composition、类型声明和 SSR class 一致性取决于工具链。

## 4. CSS-in-JS

常见模式包括运行时生成 style、编译期提取 CSS 和 object style。取舍：

- 优点：组件共置、JavaScript 状态驱动、类型或 token 集成。
- 成本：runtime、SSR/hydration、缓存、调试和框架耦合。

不能把所有 CSS-in-JS 实现视为同一种性能模型。

## 5. Sass/Less 与原生 CSS

预处理器提供变量、mixin、函数、循环和模块，在构建时输出 CSS。原生 CSS 已支持 custom properties、nesting、cascade layer、color functions 等，但两者变量运行时能力和生成结构不同。

避免无界嵌套 selector，它会提高 specificity、扩大匹配范围并让组件难覆盖。

## 6. Compat Toolchain

- Browserslist：声明目标环境。
- Autoprefixer：根据目标和 Can I Use 数据添加必要前缀。
- PostCSS：解析并通过插件转换 CSS 的工具平台。
- minifier：合并或压缩安全的 CSS 表达。

手工添加所有前缀容易过时，也可能遗漏值级和语法级转换。

## 7. Feature Query

```css
.layout { display: block; }

@supports (display: grid) {
  .layout { display: grid; }
}
```

先提供可用基础体验，再增强为新能力属于 progressive enhancement。`@supports` 检查浏览器是否接受声明语法，不保证具体实现没有 bug，也不等于用户设备适合某效果。

## 8. Cascade Architecture

可使用 layer 管理来源：

```css
@layer reset, base, tokens, components, utilities, overrides;
```

结合低 specificity selector、语义 token 和明确组件边界，减少 `!important` 军备竞赛。完整前端构建内容见 `docs/engineering`。

## Interview

### CSS Modules 如何实现局部作用域？

构建工具解析 CSS，把本地 class 名改写为带 hash/作用域的唯一名称，同时导出原名到生成名的 mapping。浏览器最终看到的仍是普通全局 CSS selector。
