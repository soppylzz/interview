# CSS 单位与百分比

> 相对单位必须同时说明相对谁。相同的 `%` 写在不同属性上，参照物可能不同。

## 1. 常见单位

| 单位 | 参照 |
| --- | --- |
| px | CSS pixel |
| em | 当前元素计算字体大小；用于 font-size 时相对父字体 |
| rem | 根元素计算字体大小 |
| vw/vh | large viewport 的 1%（传统行为） |
| svw/svh | small viewport 的 1% |
| lvw/lvh | large viewport 的 1% |
| dvw/dvh | dynamic viewport 的 1% |
| ch | 字体 `0` 字形 advance 的近似度量 |
| lh/rlh | 当前/根 line-height |

CSS px 是抽象长度，不总等于一个物理像素。浏览器缩放和 devicePixelRatio 会改变 CSS pixel 与 device pixel 的映射。

## 2. em 与 rem

em 适合让组件间距随自身字号缩放；嵌套 font-size 使用 em 会累乘。rem 统一相对根字号，适合全局尺寸尺度。二者不是必须二选一。

不要通过禁止用户缩放或固定过小 px 字号破坏可访问性。

## 3. 百分比

- width/min/max-width：通常相对 containing block 宽度。
- height/min/max-height：相对 containing block 高度，常要求其高度 definite。
- padding/margin：物理四方向百分比传统上都相对 containing block inline size。
- absolute inset：对应轴的 containing block 尺寸。
- `translate()`：相对元素自身 transform reference box。
- border-radius：水平/垂直百分比分别相对自身 border box 对应尺寸。

## 4. Viewport

移动端地址栏出现/隐藏会改变可见区域。传统 vh 可能对应 large viewport，使 `100vh` 内容被浏览器 UI 遮挡。

- svh：稳定的小视口，内容更不易被 UI 遮挡。
- lvh：浏览器 UI 收起后的大视口。
- dvh：随 UI 动态变化，可能在滚动时引发尺寸更新。

## 5. 1px 边框

高 DPR 屏幕中 1 CSS px 会覆盖多个 device pixel。“物理 1px”需求可用高分辨率 media query、伪元素 transform 等实现，但需考虑缩放、布局和现代浏览器 subpixel rendering，不能把 DPR 与分辨率简单等同。

## Interview

### em 用在 font-size 和 padding 上参照相同吗？

不完全相同。font-size: 2em 相对父元素字体计算；该元素其他属性的 1em 使用元素自身已经计算出的 font-size。
