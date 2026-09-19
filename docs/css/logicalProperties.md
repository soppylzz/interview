# 逻辑属性与书写模式

> 逻辑属性使用 inline/block axis 和 start/end 表达布局，使同一组件适应横排、竖排以及从左到右、从右到左的文字。

## 1. 两条逻辑轴

- inline axis：文字在一行内前进的方向。
- block axis：产生新行或 block 排列的方向。

默认 horizontal-tb、ltr 中，inline 是左到右，block 是上到下。但这不是所有语言和 writing mode 的固定方向。

## 2. 常见映射

| 物理属性 | 逻辑属性 |
| --- | --- |
| width/height | inline-size/block-size |
| min-width/max-width | min-inline-size/max-inline-size |
| margin-left/right | margin-inline-start/end |
| padding-top/bottom | padding-block-start/end |
| left/right | inset-inline-start/end |
| border-top | border-block-start |

shorthand：`margin-inline`、`padding-block`、`inset-inline` 等。

## 3. writing-mode 与 direction

- `writing-mode: horizontal-tb`：横排，block 向下。
- `vertical-rl`：竖排，block 通常从右向左。
- `vertical-lr`：竖排，block 从左向右。
- `direction` 主要控制 inline text direction 和 bidi 相关行为。

不要只用 direction 做整体镜像；图标、数字、代码和混合文本还受 Unicode Bidirectional Algorithm 影响。

## 4. Flex 与 Grid

Flex 的 row 对应 inline axis，column 对应 block axis，因此 writing-mode/direction 会改变视觉方向。Grid 的 block/inline alignment 同样基于逻辑轴。

逻辑属性能减少 RTL 中覆盖 left/right 的样式，但需要测试图标方向、滚动条、文本截断和 absolute positioning。

## 5. 何时保留物理属性

真实物理方向具有语义时仍可使用，例如始终位于屏幕顶部的固定工具条、阴影光源方向或画布坐标。组件内容间距和文字相关布局通常更适合逻辑属性。

## Interview

### inline axis 是否一定水平？

不是。它由 writing-mode 和 direction 决定。在 vertical writing mode 中 inline axis 可以是垂直方向。
