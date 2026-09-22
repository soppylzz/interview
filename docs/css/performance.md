# CSS 性能与渲染

> CSS 性能应结合浏览器实际 trace 分析。属性分类只能帮助建立预期，不能替代测量。

## 1. 渲染阶段

样式变化可能触发：

1. Style recalculation。
2. Layout：计算几何位置和尺寸。
3. Paint：生成绘制指令或更新 raster content。
4. Composite：组合图层并呈现。

布局变化通常还需要后续 paint/composite；颜色等视觉变化可能跳过 layout；合成层上的 transform/opacity 动画可能只需 composite。

## 2. Forced Synchronous Layout

浏览器会批量延迟样式和布局。若代码修改样式后立刻读取依赖最新几何的属性，为返回正确值，浏览器可能同步完成 style/layout。

常见读操作包括 offset/client/scroll 系列、`getBoundingClientRect()` 和部分 computed style 查询。

```js
// Batch reads before writes.
const widths = elements.map((element) => element.offsetWidth)
elements.forEach((element, index) => {
  element.style.width = `${widths[index] + 10}px`
})
```

循环中读写交错会形成 layout thrashing。

## 3. Transform 与 Opacity

它们不改变普通流几何，且常可由 compositor 更新。但以下情况仍有成本：

- 元素首次提升图层需要 paint/raster。
- 大图层占用显存并增加上传成本。
- filter、复杂 clip 和大面积透明混合可能昂贵。
- 浏览器不保证每个 transform 元素都独立合成。

## 4. will-change

`will-change` 提示即将变化，让浏览器提前准备。只应在变化前给少量元素设置，结束后移除。长期给大量元素设置会增加 layer、内存和合成负担。

## 5. Containment

`contain` 告诉浏览器子树在哪些方面独立，`content-visibility: auto` 可跳过离屏内容的 layout/paint。必须提供真实约束，否则 size containment 会改变布局结果。

`contain-intrinsic-size` 可为尚未渲染内容提供占位估计，减少滚动条尺寸跳变。

## 6. 选择器性能

浏览器匹配 selector 很快。相比微调普通 selector，更应关注：

- DOM 规模。
- 高频切换影响大量后代的 class/attribute。
- `:has()` 等关系 selector 影响的 invalidation 范围。
- 动画中持续触发 layout/paint。

只有 profile 指向 style recalculation 时才针对 selector 和 invalidation 优化。

## Interview

### Reflow 一定触发 repaint 吗？

布局结果变化通常要求更新绘制与合成，但浏览器会复用未受影响内容并进行增量处理。“整页全部重绘”不是必然。详细流程见 `docs/browser/core/rendering.md`，优化闭环见 `docs/perf`。
