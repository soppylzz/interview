# 类型体操常用模式

类型体操用于理解 conditional、infer、tuple 和模板字面量类型。生产类型应优先考虑错误提示、编译性能和可维护性。

## Tuple 与递归

```ts
type IsTuple<T extends readonly unknown[]> =
  number extends T['length'] ? false : true

type Reverse<
  T extends readonly unknown[],
  Acc extends unknown[] = [],
> = T extends readonly [infer Head, ...infer Rest]
  ? Reverse<Rest, [Head, ...Acc]>
  : Acc
```

普通数组的 length 是 `number`，tuple 的 length 是数字字面量。variadic tuple 用 `...infer Rest` 拆解；accumulator 常减少返回阶段的嵌套构造。

## 字符串与过滤

```ts
type Split<S extends string, Sep extends string> =
  S extends `${infer Head}${Sep}${infer Tail}`
    ? [Head, ...Split<Tail, Sep>]
    : [S]

type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K]
}
```

`never` 在分布式 conditional 中过滤 union，在 key remapping 中删除属性。infer 在协变候选中倾向 union，在逆变候选中可能形成 intersection。

union 转 tuple 常依赖重载推断和编译器内部的 union 顺序，该顺序不应作为业务 API 契约。深递归和 union 组合会触发“instantiation excessively deep”或明显拖慢编辑器，可改为有限深度、尾递归 accumulator 或简化目标。

测试类型可用 `Equal<A, B>` 与 `Expect<...>`，并同时验证正例、反例和 readonly/union/never 边界。对应练习位于 `handwrite/type-challenges`。
