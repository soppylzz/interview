# Containing Block（包含块）

> 包含块是元素计算尺寸和位置时使用的参照矩形。它不一定是父元素，也不一定取父元素的 content box。

## 1. 为什么重要

以下值常依赖包含块：

- `width`、`height`、`min/max-*` 的百分比。
- `padding`、`margin` 的百分比。
- positioned element 的 `top/right/bottom/left` 或 `inset`。
- 某些 auto size 和 replaced element 尺寸。

根元素所在的 initial containing block 在连续媒体中通常具有 viewport 尺寸。

## 2. 普通流元素

`position: static | relative | sticky` 时，包含块通常由最近的 block container 或建立 formatting context 的祖先形成，参照其 content box。

“最近的父元素”只是常见结果，不是定义。

## 3. 绝对定位

`position: absolute` 的包含块通常由最近的 `position` 不为 `static` 的祖先形成，使用该祖先 padding box。

如果没有符合条件的祖先，则相对 initial containing block。常用写法：

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  inset: 0;
}
```

relative 祖先自身仍留在普通流，只负责成为定位参照。

## 4. Fixed 的例外

`position: fixed` 默认相对 viewport，但最近祖先的以下属性可能为 absolute/fixed descendant 创建包含块：

- 非 `none` 的 `transform`、`filter`、`perspective` 等。
- `contain: layout | paint | content | strict`。
- `will-change` 指向会创建包含块的属性。
- `content-visibility: auto`。

因此弹窗放进带 transform 的祖先后，fixed 可能随祖先移动和裁剪。

## 5. 百分比参照

| 属性 | 常见参照 |
| --- | --- |
| `width`、`left/right` | 包含块 inline size（横排时为宽度） |
| `height`、`top/bottom` | 包含块高度 |
| `padding`、`margin` 百分比 | 包含块 inline size |
| `translate(%)` | 元素自身 reference box |

普通流元素的百分比高度需要包含块有 definite height，否则常退化为 auto。绝对定位元素在 top/bottom 或明确高度等条件下有不同尺寸求解规则。

## Interview

### 为什么 `height: 100%` 不生效？

百分比高度需要可确定的包含块高度。若父元素高度由内容撑开，子元素的 100% 无法用父元素尚未确定的高度计算，通常按 auto 处理。

### 为什么 fixed 不再相对视口？

检查祖先是否设置 transform、filter、perspective、contain、will-change 或 content-visibility，这些属性可能为 fixed descendant 创建新的 containing block。
