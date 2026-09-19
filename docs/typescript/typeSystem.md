# TypeScript 类型系统基础

TypeScript 在 JavaScript 上增加静态类型检查和类型层语法。大多数类型信息在 emit 时被擦除，运行时仍是 JavaScript，因此类型正确不代表网络响应、localStorage 或用户输入一定符合声明。

## 结构化类型

TypeScript 主要按成员结构判断兼容性，而非按类型名称：

```ts
type Point = { x: number; y: number }
const value = { x: 1, y: 2, label: 'A' }
const point: Point = value
```

名义类型要求显式身份相同；TypeScript 可用 private/protected 成员或 brand 模拟部分名义约束。subtype 是理论上的集合关系，assignable 是编译器实际采用的兼容规则，后者还包含 `any`、enum 等语言便利规则。

## 类型产生方式

- 注解由开发者给出目标类型。
- 推断根据表达式和使用位置计算类型。
- contextual typing 从接收位置反向约束表达式，例如回调参数。

可变位置中的字面量常 widening：`let method = 'GET'` 推断为 `string`，因为稍后可重新赋值；`const`、`as const` 或适当上下文可保留字面量。

union 表示值属于多个类型之一，intersection 表示值同时满足多个类型。可辨识联合用共同的字面量字段表达互斥状态，让控制流分析完成安全收窄。

TypeScript 有意接受一些符合 JavaScript 用法但不完全健全的行为，例如数组协变、方法参数双变和未检查索引。它的目标是在安全性、兼容性和开发体验间取舍，不是数学证明系统。
