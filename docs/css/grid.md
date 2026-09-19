# Grid 布局

> Grid 是二维布局模型，同时控制行和列。它适合页面区域、卡片矩阵和需要明确轨道关系的组件。

## 1. 基本概念

- grid container：设置 `display: grid | inline-grid` 的元素。
- grid item：container 的直接子元素。
- grid line：划分轨道的线，从 1 开始编号，也可命名。
- track：相邻 grid line 之间的一行或一列。
- cell：一行和一列交叉形成的单元格。
- area：一个或多个连续 cell 组成的矩形。

## 2. 定义轨道

```css
.layout {
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr) 16rem;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
```

`fr` 分配可用空间。轨道默认 minimum 可能是 auto/min-content，因此 `1fr` 中的长内容仍可能撑破容器；`minmax(0, 1fr)` 允许收缩到 0。

## 3. repeat、auto-fill、auto-fit

```css
grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
```

- auto-fill：尽可能创建可容纳的轨道，空轨道仍保留。
- auto-fit：创建方式相似，但空轨道会折叠，让已有 item 扩展。

有足够 item 填满时二者常看起来相同。

## 4. 显式与隐式网格

`grid-template-*` 创建 explicit grid。item 被放到范围外或自动放置需要更多轨道时，会创建 implicit grid，尺寸由 `grid-auto-rows/columns` 控制。

`grid-auto-flow` 控制自动放置方向，`dense` 会尝试回填空洞，可能让视觉顺序与 DOM 顺序不同。

## 5. 定位

```css
.main {
  grid-column: 2 / 3;
  grid-row: 1 / span 2;
}
```

也可命名 line 或 area：

```css
.layout {
  grid-template-areas:
    "header header"
    "sidebar main";
}
```

重叠 item 仍按 stacking 规则绘制，可使用 z-index。

## 6. 对齐

- `justify-items/align-items`：item 在 cell 内的 inline/block axis 对齐。
- `justify-content/align-content`：整个 grid 在 container 剩余空间中的对齐。
- `justify-self/align-self`：覆盖单个 item。
- `place-*`：对应 align 与 justify 的 shorthand。

## Interview

### Grid 与 Flex 如何选择？

Flex 从内容出发处理一条主轴，每行相对独立；Grid 从容器出发定义二维轨道，让多行多列共享对齐关系。实际组件可嵌套使用。
