# Overflow 与滚动

> overflow 决定内容超出 box 时如何绘制，也会影响 scroll container、BFC、sticky 和程序化滚动。

## 1. 取值

| 值 | 裁剪 | Scroll container | 用户滚动条 |
| --- | --- | --- | --- |
| visible | 否 | 否 | 否 |
| hidden | 是 | 是，可程序化滚动 | 通常隐藏 |
| clip | 是 | 否 | 无 |
| auto | 需要时 | 是 | 需要时显示 |
| scroll | 是 | 是 | 通常始终保留 |

`overflow: hidden` 通常创建 BFC；`clip` 本身不创建 BFC，需要时可配合 `display: flow-root`。clip 也不提供普通程序化滚动容器能力。

当一个轴是 visible/clip、另一个轴不是时，computed value 可能发生联动变化，需要查看实际计算结果。

## 2. 溢出前提

要出现局部滚动，容器在对应轴通常需要受限尺寸。例如 column flex 中的滚动子项常需 `min-height: 0`，否则自动最小尺寸让它继续撑大父项而不是内部滚动。

滚动条可能占用布局宽度。`scrollbar-gutter: stable` 可预留空间，减少滚动条出现造成的布局变化。

## 3. text-overflow

`text-overflow: ellipsis` 只描述 inline progression direction 上被裁剪内容的标记，通常还需要：

```css
overflow: hidden;
white-space: nowrap;
```

并确保 box 实际有受限宽度。在 flex item 中还常需 `min-width: 0`。

## 4. 滚动链

内层 scroll container 到达边界后，滚动可能继续传给祖先，称为 scroll chaining。

```css
.modal-body {
  overscroll-behavior: contain;
}
```

`overscroll-behavior` 控制边界后的传播和浏览器 overscroll 行为，比全局阻止 wheel/touch 事件更合适。

移动端“滚动穿透”还可能涉及 body 固定、top layer、touch handling 和平台差异。

## 5. Scroll Snap

scroll container 使用 `scroll-snap-type`，child 使用 `scroll-snap-align`。它适合轮播、分页区域等，但强制 snap 可能妨碍用户定位和可访问性，应谨慎选择 mandatory/proximity。

## Interview

### hidden 与 clip 有什么区别？

二者都裁剪内容；hidden 创建可程序化滚动的 scroll container，并通常创建 BFC；clip 不建立普通 scroll container，也不能通过常规滚动访问被裁剪区域。
