# 层叠、优先级与继承

> 当多个声明作用于同一属性时，浏览器先按层叠规则选出声明，再处理继承和属性值计算。specificity 只是层叠中的一个步骤。

## 1. 层叠顺序

简化判断流程：

1. Relevance：选择器匹配，条件规则成立。
2. Origin 与 importance：用户代理、用户、作者、动画、important、transition。
3. Cascade layer：比较声明所在层。
4. Specificity：比较选择器权重。
5. Scoping proximity：使用 `@scope` 时比较距离。
6. Order of appearance：前面仍相同则后声明获胜。

普通作者声明高于普通用户和 UA 声明；important 会反转 origin 与 layer 的优先方向。transition 中正在插值的值优先级最高，animation 值高于普通声明但低于 important。

## 2. Specificity

可按三列比较：

```text
ID - CLASS - TYPE
```

- ID selector 增加 ID 列。
- class、attribute、pseudo-class 增加 CLASS 列。
- type selector、pseudo-element 增加 TYPE 列。
- inline style 可视为更高的作者声明权重。

`:where()` 权重恒为 0；`:is()`、`:not()`、`:has()` 本身不加权，取参数列表中最高 specificity。

## 3. Cascade Layer

```css
@layer reset, base, components, utilities;
```

普通声明中，后 layer 优先；important 声明中顺序反转，让较早的基础层能够保护关键约束。未分层的普通作者样式高于已分层普通样式。

layer 用于管理来源顺序，不能代替合理的 selector 和组件边界。

## 4. 继承

文字、颜色等属性常继承；尺寸、边距、边框通常不继承。是否继承由属性定义决定，不由元素是父子关系就一概而论。

- `inherit`：使用父元素 computed value。
- `initial`：使用属性规范初始值。
- `unset`：可继承属性等同 inherit，否则等同 initial。
- `revert`：回退到较低 origin 的层叠结果。
- `revert-layer`：回退当前 layer，让较低 layer 重新参与。

## 5. 值处理

- declared value：所有候选声明。
- cascaded value：层叠胜出的值。
- specified value：补上 defaulting 后的值。
- computed value：解析继承和部分相对值后的结果。
- used value：布局时使用的实际尺寸等。
- actual value：经过设备与渲染限制后的最终值。

`getComputedStyle()` 名称虽是 computed style，部分属性返回的是 resolved value，可能接近 used value。

## Interview

### `!important` 能覆盖 inline style 吗？

作者级 important 声明可高于普通 inline style；但还要考虑用户 important、UA important、transition、layer 等完整层叠顺序，不能只比较 specificity。
