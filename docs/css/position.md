# 定位与常见布局

> `position` 改变元素的位置计算方式。是否脱离普通流、相对哪个 containing block、是否保留原空间是三个独立问题。

## 1. 五种定位

| position | 普通流占位 | 定位参照 |
| --- | --- | --- |
| static | 是 | 普通布局，不接受 inset 定位 |
| relative | 是 | 相对自身正常位置偏移 |
| absolute | 否 | 最近定位或特殊祖先的 containing block |
| fixed | 否 | 默认 viewport，可能被特殊祖先改写 |
| sticky | 是 | 正常位置与 scrollport 约束共同决定 |

relative 位移不会让兄弟元素重新填补原空间；absolute/fixed 不参与普通流尺寸排列。

## 2. Absolute 尺寸

absolute element 同时设置左右 inset 且 width 为 auto 时可被拉伸；明确 width 后，auto margin 或某一 auto inset 根据约束求解。top/bottom 与 height 类似。

绝对定位元素的 margin 不与其他 margin collapse。

## 3. Fixed 的参照变化

祖先的 transform、filter、perspective、contain 等可能为 fixed 创建 containing block。此时 fixed 不再固定于 viewport，并可能被祖先 overflow/clip 裁剪。

## 4. Sticky

sticky 先处于普通流，在滚动到 inset 阈值后被限制在最近 scrollport 内，同时不能越过 containing block 的末端。

常见失效原因：

- 没有设置对应方向的 inset，例如 `top`。
- 祖先 overflow 创建了意外 scroll container，但它实际没有可滚动距离。
- sticky 元素与容器等高，没有移动空间。
- flex/grid stretch 使 item 占满 cross size。
- 祖先尺寸或滚动方向与预期不同。
- 被其他元素遮挡，需要检查 stacking context。

## 5. 居中

```css
/* Preferred general layout */
.parent {
  display: grid;
  place-items: center;
}
```

Flex 可用 `justify-content` 和 `align-items`。已知 block width 可用 inline auto margin。脱离流元素可用 inset 50% 加 `translate(-50%, -50%)`，其中 inset 百分比参照 containing block，translate 百分比参照自身。

## 6. 两栏与三栏

现代实现优先 Grid：

```css
.two-columns {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
}

.three-columns {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr) 200px;
}
```

`minmax(0, 1fr)` 避免中间列受 min-content minimum 撑破。Flex 同样可实现，注意自适应 item 的 `min-width: 0`。

## Interview

### 脱离普通流是什么意思？

该 box 不再按普通流为兄弟元素占据位置，父元素 auto size 通常也不靠它撑开。视觉上仍可能覆盖其他内容，并仍属于 DOM、stacking 和 containing block 体系。
