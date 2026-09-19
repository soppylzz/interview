# BFC（块级格式化上下文）

> BFC 是按照 block layout 规则布局块盒、处理浮动的独立区域。创建 BFC 会包含内部浮动、排斥外部浮动，并抑制跨边界的外边距折叠。

## 1. 定义

页面中的盒子总处于某种 formatting context。BFC 内的块盒通常沿 block axis 依次排列；浮动元素也在所属 BFC 中参与计算。

BFC 不是脱离文档流，也不等于 stacking context 或 containing block。这些概念可能由同一个属性同时触发，但职责不同。

## 2. 常见创建方式

- 根元素。
- `float` 不为 `none`。
- `position: absolute | fixed`。
- `display: inline-block | flow-root`。
- table cell、table caption。
- flex/grid item 在符合条件时。
- `overflow` 不为 `visible` 或 `clip`。
- `contain: layout | paint | content | strict`。
- `container-type` 不为 `normal`。
- multi-column container。

为了单纯创建 BFC，优先使用 `display: flow-root`，它清楚表达意图，通常不会附带裁剪、滚动或布局模式变化。

## 3. 三个重要效果

### 包含内部浮动

普通父元素只有浮动子元素时，计算自身 auto height 时可能不包含浮动高度。父元素创建 BFC 后，会包含这些浮动。

### 排斥外部浮动

BFC 的 border box 不会与同一 BFC 中外部 float 的 margin box 重叠，因此可形成图文旁的自适应区域。

### 抑制外边距折叠

不同 BFC 中块盒的垂直 margin 不会彼此折叠。创建 BFC 可以阻止父子 margin 穿透，但应先判断是否更适合使用 padding、gap 或明确布局。

## 4. 清除浮动

```css
.parent {
  display: flow-root;
}
```

这不是把子元素的 `float` 改回普通流，而是让父 BFC 计算高度时包含内部浮动。

传统 clearfix 通过生成带 `clear: both` 的伪元素，让清除位置落在所有浮动之后，从而撑开父元素。

## Interview

### BFC 能解决什么问题？

常见回答是包含内部浮动、避免被外部浮动覆盖、阻止跨 BFC 的 margin collapse。不能笼统回答“BFC 内外互不影响”，样式继承、尺寸依赖等关系仍然存在。

### `overflow: hidden` 为什么能清除浮动？

因为它会创建 BFC，父元素 auto height 会包含内部浮动。裁剪只是额外副作用，所以更推荐 `display: flow-root`。
