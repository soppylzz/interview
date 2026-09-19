# 选择器与伪元素

> 选择器决定规则匹配哪些元素。面试既要会写，也要能判断结构伪类、生成内容和 specificity。

## 1. 常见选择器

- type：`button`
- class：`.button`
- ID：`#submit`
- attribute：`[disabled]`、`[type="email"]`
- descendant：`.card p`
- child：`.list > li`
- adjacent sibling：`h2 + p`
- general sibling：`h2 ~ p`

复杂 selector 通常从右侧 candidate element 开始匹配，再向祖先或 sibling 验证关系。这不意味着必须为了性能把所有 selector 写得极短；可维护性和减少无意义的全局匹配更重要。

## 2. 结构伪类

`:nth-child()` 先按父元素的全部 element children 计算位置，再检查当前 compound selector；`:nth-of-type()` 只在相同 tag name 的 sibling 中计数。

现代 `:nth-child(An+B of selector)` 可以先限定参与计数的元素。

`:first-child` 要求元素确实是父元素的第一个 element child，不是“某种类型中的第一个”。需要按类型时使用 `:first-of-type`。

## 3. 逻辑与关系伪类

- `:is(...)`：匹配任一参数，specificity 取最高参数。
- `:where(...)`：同样分组，但 specificity 为 0。
- `:not(...)`：排除参数匹配。
- `:has(...)`：根据 relative selector 匹配，常用于“拥有某后代/兄弟”的元素。

```css
.field:has(input:invalid) {
  border-color: red;
}
```

## 4. 状态伪类

- `:focus`：元素获得焦点。
- `:focus-visible`：浏览器判断应显示明显焦点提示。
- `:focus-within`：元素自身或后代获得焦点。
- `:disabled`、`:checked`、`:invalid`：表单语义状态。

不要移除 outline 而不提供等价焦点样式。

## 5. Pseudo-element

`::before`、`::after` 在元素 formatting structure 中生成 box，依赖 `content`。它们不是 DOM node，不能承载真实语义或成为可靠表单内容。

generated content 适合装饰、标记和辅助视觉，不应承载用户必须读取或复制的核心信息。

其他常见伪元素：`::marker`、`::placeholder`、`::selection`、`::first-line`、`::backdrop`。

## Interview

### `:nth-child(2)` 与 `:nth-of-type(2)` 有什么区别？

前者匹配父元素全部 element child 中排第二的元素；后者匹配同 tag name sibling 中排第二的元素。
