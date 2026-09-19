# Stacking Context（堆叠上下文）

> 堆叠上下文是一组独立参与 z-axis 排序的盒子。子堆叠上下文内部排好顺序后，整体作为父堆叠上下文中的一个原子单元。

## 1. 为什么 `z-index: 9999` 仍被遮挡

`z-index` 只在所属 stacking context 内比较。若元素位于较低层的父 stacking context 中，它无法通过增大自身 z-index 越过父级的兄弟 stacking context。

```text
root stacking context
├── A (z-index: 1)
│   └── child (z-index: 9999)
└── B (z-index: 2)
```

child 仍随 A 整体位于 B 下方。

## 2. 常见创建条件

- 根元素。
- positioned element 且 `z-index` 不为 `auto`。
- `position: fixed | sticky`。
- flex/grid item 且 `z-index` 不为 `auto`。
- `opacity < 1`。
- 非 `normal` 的 `mix-blend-mode`。
- 非 `none` 的 transform、filter、perspective、clip-path、mask 等。
- `isolation: isolate`。
- `will-change` 指向会创建 stacking context 的属性。
- `contain: layout | paint` 等组合值。
- `container-type: size | inline-size`。
- top layer 中的元素，例如打开的 dialog、popover。

创建 stacking context 与提升 compositor layer 不是一回事，浏览器是否单独合成还取决于实现策略。

## 3. 简化绘制顺序

同一 stacking context 内可用以下简化模型理解：

1. context 自身 background/border。
2. 负 z-index 的 positioned descendants。
3. 普通流 block background/border。
4. float。
5. inline content。
6. z-index 为 auto/0 的 positioned 内容和部分 context。
7. 正 z-index，数值由小到大。

真实规范还细分匿名盒、装饰和嵌套关系。面试排查重点是先找 stacking context 边界，再比较同一层级的 z-index。

## 4. `z-index: auto` 与 `0`

二者绘制层级可能相近，但语义不同：positioned element 的 `z-index: 0` 会创建 stacking context，`auto` 通常不会。新 context 会把后代限制在内部。

## 5. Top Layer

fullscreen、打开的 modal dialog、popover 等可进入浏览器 top layer。top layer 位于普通文档 stacking context 之上，仅提高普通 z-index 无法盖过它。

## Interview

### 如何排查 z-index 无效？

检查元素是否实际参与 z-index 排序、祖先是否创建 stacking context、目标元素属于哪个 context，以及是否涉及 top layer、overflow clipping。不要只持续增大数值。

### opacity 为什么会创建 stacking context？

透明度需要把元素及其后代作为整体离屏合成后再与背景混合，因此内部先独立完成绘制排序。
