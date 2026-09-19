# display 与格式化模型

> `display` 决定元素生成什么 box、如何参与外部布局，以及它如何布局子元素。

## 1. Outer 与 Inner

现代语法可以把 display 理解为：

- outer display type：元素自身在父 formatting context 中是 block-level 还是 inline-level。
- inner display type：元素内部使用 flow、flex、grid 等哪种布局。

例如 `display: inline flex` 表示自身是 inline-level，内部建立 flex formatting context；传统 `inline-flex` 是兼容的单关键字写法。

## 2. 常见区别

| 类型 | 外部表现 | 宽高 | 默认换行 |
| --- | --- | --- | --- |
| block | block-level | 可设置 | 独占一行 |
| inline | inline-level | width/height 不按普通盒方式生效 | 随文本排列 |
| inline-block | inline-level | 可设置 | 随行排列 |

inline non-replaced element 的水平 padding/margin 会影响行内布局；垂直 padding/border 会绘制但通常不撑大 line box，垂直 margin 不按 block margin 的方式改变行距。

## 3. 隐藏方式

| 方式 | 占据布局 | 绘制 | 命中/焦点 | Accessibility tree |
| --- | --- | --- | --- | --- |
| `display: none` | 否 | 否 | 否 | 通常移除 |
| `visibility: hidden` | 是 | 否 | 通常否 | 通常隐藏 |
| `opacity: 0` | 是 | 透明合成 | 仍可能命中和聚焦 | 仍存在 |

仅设置 opacity 不能实现完整隐藏交互，常需配合 `pointer-events`、focus 管理和语义状态。

## 4. `display: contents`

元素自身不生成 principal box，子元素像直接参与父布局，但 DOM 结构仍存在。它适合去掉纯布局 wrapper 的 box。

注意：

- 元素自身 background、border、尺寸不会绘制。
- 定位、伪元素和 accessibility 行为存在历史兼容问题。
- 它不会删除 DOM 节点，也不会改变事件传播路径。

## 5. `display: none` 与资源

隐藏元素不进入 layout tree，但资源加载不只由 layout 决定。HTML parser 发现的 `<img>` 可能仍请求资源；CSS background 是否请求与样式匹配、浏览器实现有关，不能用 display none 当可靠网络控制。

## Interview

### inline 元素能设置 padding 吗？

能。水平 padding 会影响行内占用；垂直 padding 会绘制但通常不改变 line box 高度，可能与相邻行重叠。width/height 对普通 non-replaced inline box 不按 block box 方式生效。
