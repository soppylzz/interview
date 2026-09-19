# 特殊类型

| 类型 | 作用 |
| --- | --- |
| `any` | 关闭大部分检查，并传播不安全性 |
| `unknown` | 接受任意值，但使用前必须收窄 |
| `never` | 不可能存在的值或不可到达结果 |
| `void` | 调用者不应使用返回值 |

`unknown` 适合作为 JSON、catch error 和第三方输入的起点。`any` 可双向赋值并任意访问、调用，通常只用于迁移边界，且应尽快收窄。

`never` 是所有类型的子类型，在 union 中会消失：`string | never` 化简为 `string`。它可表示必然 throw 的函数、穷尽检查，并在分布式条件类型中筛掉成员。

## void、null 与对象类型

`void` 不等于 `undefined`，它表达返回值不被观察。返回 `void` 的回调类型可接收实际有返回值的函数，便于 `forEach` 使用 `array.push` 等回调；调用结果仍按 `void` 处理。

开启 `strictNullChecks` 后，`null`、`undefined` 不再普遍可赋给其他类型，缺失状态必须显式建模。

- `object` 表示非原始值。
- `Object` 接近 JavaScript 装箱基类，通常不应用作普通对象约束。
- `{}` 表示任意非 null/undefined 值，包含字符串和数字。

想表达未知键值对象时通常使用 `Record<PropertyKey, unknown>` 或更符合领域的结构，而不是上述宽泛类型。
