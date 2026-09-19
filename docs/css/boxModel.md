# 盒模型与尺寸计算

> 每个 CSS box 由 content、padding、border、margin 四个区域构成。`box-sizing` 决定声明的 width/height 覆盖哪一部分。

## 1. 两种盒模型

### content-box

```text
border box width = width + padding-left/right + border-left/right
```

默认 `width` 只指定 content box。

### border-box

```text
content width = width - padding-left/right - border-left/right
```

声明 width 覆盖 content、padding、border。margin 永远不包含在 width 中。

## 2. 占用空间

普通无折叠场景中，元素外部占用宽度还需加 margin。`outline`、box-shadow、transform 不参与普通布局尺寸，虽然可能在视觉上超出 border box。

滚动条是否占据 content/padding 区域取决于平台和 overlay scrollbar。不能假定所有系统都固定减去同样宽度。

## 3. `auto` 与 `100%`

block-level box 的 `width: auto` 会参与约束求解，通常填满包含块的可用宽度，并为 margin、border、padding 留空间。

`width: 100%` 明确把 width 设为包含块宽度；在 content-box 下再加 padding、border 和 margin，容易溢出。

## 4. min/max

最终尺寸会受到 min/max 约束。可理解为先应用 max 限制，再应用 min 限制；当 `min-width > max-width` 时，min 约束获胜。

内容也可能产生 intrinsic minimum，例如 flex item 默认 `min-width: auto`，导致声明 width 看似无法继续缩小。

## 5. 全局 border-box

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

它让组件的声明尺寸更容易包含内边距和边框。若组件需要继承式控制，也可让伪元素和后代使用 `box-sizing: inherit`。

## Interview

### `offsetWidth` 与 `clientWidth` 有什么区别？

offsetWidth 通常包含 padding、border 和占位滚动条；clientWidth 包含 padding，但不含 border 和垂直滚动条。二者是整数 CSS pixel，精确浮点几何可看 `getBoundingClientRect()`。
