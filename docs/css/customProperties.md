# CSS 自定义属性

> 自定义属性保存 token stream，并通过正常层叠与继承获得值；`var()` 在使用位置进行替换。

## 1. 基本使用

```css
:root {
  --brand: #3366ff;
  --space: 0.75rem;
}

.button {
  color: var(--brand);
  padding: var(--space);
}
```

普通 `--*` 自定义属性默认继承，名称区分大小写。它们不是预处理器编译期变量，而是保留在浏览器运行时并参与 cascade。

## 2. Fallback

```css
color: var(--brand, blue);
```

fallback 在自定义属性缺失或是 guaranteed-invalid value 时使用。若替换后得到对当前普通属性无效的值，整个声明会在 computed-value time 失效，fallback 不一定替它修复。

fallback 可嵌套：

```css
color: var(--theme-color, var(--brand, blue));
```

循环引用会使相关自定义属性在计算时无效。

## 3. 主题

```css
:root { --surface: white; --text: #111; }
[data-theme="dark"] { --surface: #111; --text: #eee; }
```

组件使用语义 token，不直接知道主题选择逻辑。自定义属性更新会影响使用它的后代，修改大量高层 token 时仍有 style recalculation 成本。

## 4. 与 Sass/Less 的区别

- 预处理变量在构建时替换，浏览器中不存在。
- CSS 自定义属性运行时存在，可由 DOM scope、media query、cascade 修改。
- 预处理器可生成 selector 和结构；var() 主要替换 property value 中的 token。

## 5. `@property`

```css
@property --progress {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}
```

注册后可声明语法、初始值和继承行为，并让浏览器理解类型以进行插值动画。错误类型会按注册规则处理，而不是保存任意 token。

## Interview

### 自定义属性何时解析？

声明时主要保存 token；在某属性通过 var() 使用时才结合 cascade、继承和 fallback 替换并验证。这使同一个变量可在不同属性语境中使用，也产生 computed-value time invalid 的情况。
