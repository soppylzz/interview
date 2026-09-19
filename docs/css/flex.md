# Flex 布局

> Flexbox 是一维布局模型，沿 main axis 分配空间，并在 cross axis 上对齐每一行。

## 1. 轴

`flex-direction` 决定 main axis：row 使用 inline direction，column 使用 block direction；reverse 只反转视觉排列方向，不改变 DOM 顺序。

`justify-content` 沿 main axis 分配剩余空间；`align-items/align-self` 对齐单个 flex line 内的 item；`align-content` 分配多条 flex line 在 cross axis 的空间，单行时通常无效果。

## 2. Flexibility

```text
flex: grow shrink basis
```

- flex-basis：进入主轴空间计算的基准尺寸。
- flex-grow：有正 free space 时按比例增长。
- flex-shrink：空间不足时根据 shrink factor 与 flex base size 加权收缩。

`flex: 1` 常展开为 `1 1 0%`，各 item 从接近零基准开始分配空间；`flex: auto` 为 `1 1 auto`，会把内容或 width 作为基准。

grow 数值表示分配比例，不表示最终宽度比例，因为 basis、min/max 和内容限制仍参与计算。

## 3. 自动最小尺寸

flex item 默认 `min-width: auto`，在 row 中常保留 min-content size，导致长文本把容器撑破或 item 不收缩。

```css
.item {
  min-width: 0;
}
```

column 场景中常对应 `min-height: 0`。设置 overflow 非 visible 也会影响自动最小尺寸，但 `min-*` 更直接表达需求。

## 4. 对齐与 margin auto

main axis 上的 auto margin 会先吸收 free space，再执行 justify-content。常见导航布局可给某一项 `margin-inline-start: auto` 把后续内容推到末端。

baseline alignment 根据 item 的 alignment baseline，而不是简单比较盒子底部。

## 5. Wrap 与 gap

`flex-wrap: wrap` 允许形成多行，每行独立进行 flex sizing。`gap` 只在 item 之间产生间隔，不在容器边缘自动增加空间，通常比 item margin 更适合组件间距。

## 6. 顺序与可访问性

`order` 和 row-reverse 改变视觉顺序，但通常不改变 DOM、阅读和键盘顺序。不要用视觉排序修复语义错误。

## Interview

### `flex: 1` 为什么能等分？

它让 item 使用相同 grow、shrink，并以 0% 作为 basis，再平均分配正 free space。若 item 受不同 min-size、padding 或 border 限制，最终 border box 仍可能不完全相等。
