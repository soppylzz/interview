# 替换元素与图片适配

> Replaced element 的内容和固有尺寸由 CSS formatting model 之外的资源或控件提供，例如图片、视频和部分表单控件。

## 1. 什么是 Replaced Element

常见 replaced element：`img`、`video`、`iframe`、`embed`。CSS 通常控制其外部 box，但内部内容不是普通 DOM child box。

`input` 等表单元素的替换性质取决于具体类型和实现；不要把所有表单控件一概而论。

## 2. 固有尺寸

替换内容可能提供：

- intrinsic width/height。
- intrinsic aspect ratio。

当 CSS width/height 为 auto 时，浏览器结合固有信息、默认尺寸、可用空间和 min/max 约束求解。HTML 图片上的 width/height attribute 可在资源下载前提供比例，减少布局位移。

## 3. aspect-ratio

```css
.media {
  width: 100%;
  aspect-ratio: 16 / 9;
}
```

aspect-ratio 提供 preferred ratio，至少一个轴为自动尺寸时最有作用。min/max、内容和 layout algorithm 仍可覆盖最终结果。

replaced element 可写 `aspect-ratio: auto 16 / 9`：资源加载前使用给定比例，加载后使用固有比例。

## 4. object-fit

- fill：拉伸填满 content box，可能改变比例。
- contain：完整显示，可能留空。
- cover：填满并裁剪超出部分。
- none：不缩放。
- scale-down：在 none 和 contain 结果中选更小者。

`object-position` 控制内容在 box 中的位置。

## 5. 与 background-size

- `<img>` 是内容，有 alt、加载语义、响应式图片和固有尺寸。
- background image 是装饰层，不提供等价内容语义。
- object-fit 控制 replaced content；background-size 控制 background image。

内容图片优先 `<img>`，装饰图片使用 background。

## 6. 防止布局位移

```html
<img src="photo.jpg" width="800" height="600" alt="..." />
```

浏览器可在下载前计算 4:3 比例。再配合响应式 CSS：

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Interview

### object-fit 为什么有时看似不生效？

它控制内容如何适应 replaced element 的 content box，必须先让元素 box 在两个轴上具有可用于适配的尺寸。若 width/height 都由图片固有尺寸决定，就没有明显裁剪或留白。
