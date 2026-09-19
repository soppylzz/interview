# 普通流与外边距折叠

> Normal flow 是未被 float、absolute positioning 等特殊机制移出的盒子的默认布局方式，包含 block layout 和 inline layout。

## 1. 普通流排列

在 horizontal writing mode 中：

- block-level box 沿 block axis 从上到下排列。
- inline-level content 在 line box 中沿 inline axis 排列，空间不足时换行。
- writing-mode 和 direction 可改变轴和文字方向，不能把 block/inline 永远等同于纵/横。

## 2. Margin Collapse

Block layout 中相邻 block box 的 block-axis margin 可能折叠成一个 margin。horizontal writing mode 下常表现为垂直 margin collapse，水平 margin 不折叠。

常见场景：

- 相邻 sibling 的上下 margin。
- 父元素与第一个/最后一个 in-flow child 之间没有 border、padding、inline content、clearance 等分隔时。
- 没有 border、padding、height/min-height 和 in-flow content 的空 block，其自身上下 margin。

## 3. 折叠值计算

- 全为正值：取最大值。
- 全为负值：取绝对值最大的负值。
- 有正有负：最大正值加最小负值。

多个 margin 可传递并一起折叠，所以不能只观察直接相邻的两个元素。

## 4. 不发生折叠的情况

- 不同 BFC 边界。
- flex/grid container 内的 item margin。
- float 和 absolute positioned element。
- inline-block。
- 父子之间有 border、padding、inline content 或 clearance 分隔。
- 有明确规则阻止首尾 margin 接触。

创建 BFC 能阻止跨边界折叠，但若只是需要稳定间距，`gap`、父 padding 或明确组件间距往往更易维护。

## 5. 负 Margin

负 margin 会改变布局占用和相邻 box 位置，不等于 transform：后续元素会根据修改后的 margin 参与布局。常用于重叠或抵消容器间距，但需注意溢出和难以推导的折叠结果。

## Interview

### 父元素为什么被子元素的 margin-top 推下来？

当父 border-start 与第一个 in-flow block child 的 margin 之间没有分隔时，二者可能折叠，折叠后的 margin 出现在父元素外。可通过 padding/border、flow-root 或更合适的 gap 设计阻止。
