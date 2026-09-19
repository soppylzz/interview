# 泛型与类型推断

泛型用于表达多个位置之间的类型关联，而不是把未知类型统一写成 `any`：

```ts
function first<T>(values: readonly T[]): T | undefined {
  return values[0]
}
```

类型参数可声明在函数、接口、类型别名和类上，其作用域只覆盖对应声明。默认类型参数必须位于必选参数之后，并在无法得到候选时作为回退。

## 约束与推断

`T extends U` 在泛型声明中限制 T 的可选范围；条件类型中的 extends 则选择类型分支。

```ts
function get<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key]
}
```

调用时编译器从参数、返回值上下文和 contextual type 收集候选。函数体必须对约束内的每一种 T 都成立，所以即使当前调用传入数组，也不能在只约束 `{ length: number }` 时使用数组专属方法。

`const` type parameter 能让对象和 tuple 参数优先保留字面量及 readonly 信息，减少调用方写 `as const`，但仍受参数约束和可变性影响。

当返回类型取决于输入类型时适合泛型；候选是固定几类时 union 更清楚；不同参数形状对应不同调用协议时可使用 overload。没有关联作用、只出现一次的类型参数通常应改成具体类型或约束本身。
