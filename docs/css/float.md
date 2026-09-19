# 浮动与清除浮动

> Float 最初用于让文字围绕图片。它会让元素移到当前行的起始或末端，并改变后续 line box 的可用空间。

## 1. 浮动规则

- float box 向 inline-start/end 方向移动，直到碰到 containing block 边缘或其他 float。
- 多个同方向 float 在空间足够时并排，空间不足则向 block-end 移动到能放下的位置。
- float 不再按普通流 block box 为后续 block sibling 占位。
- 后续 line box 会缩短以避开 float，形成文字环绕。
- float 会创建 BFC，其外部 display 会 blockify。

因此“float 完全脱离文档流”不够准确：它不按普通流占位，但仍影响后续行盒和同一 BFC 的浮动布局。

## 2. 父元素高度塌陷

父元素只有 float child 时，普通 block auto height 通常不包含 float 高度，因此背景和边框看似塌陷。

解决方式：

```css
.parent {
  display: flow-root;
}
```

父元素创建 BFC 后会包含内部 float。

## 3. clear

`clear: left | right | both` 要求元素的 block-start border edge 位于相关 float 的 block-end 之后。浏览器通过增加 clearance 实现。

clear 作用于声明它的元素，不是直接修改 float，也不是一个“清除父元素 float 状态”的命令。

## 4. Clearfix

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

伪元素被放到 float 之后，clearance 使其落到最低 float 以下，从而参与父元素高度计算。现代代码单纯包含 float 更推荐 `flow-root`。

## 5. 外部 float 与 BFC

新 BFC 的 border box 会避开同一 BFC 中的外部 float。传统两栏布局可让左侧 float，右侧建立 BFC；现代布局通常用 Flex/Grid 更清晰。

## 6. 现代使用场景

float 仍适合文章中图片、引文等文字环绕。页面主布局、导航和卡片网格应优先使用 Flex/Grid。

## Interview

### 为什么 clear 不能直接让父元素包含浮动？

clear 只改变声明元素的位置。clearfix 之所以撑开父元素，是因为额外生成的普通流 box 被移动到 float 下方，再参与父元素高度计算。
