# 类型推断进阶

TypeScript 会从表达式收集候选，再结合 contextual type、约束和推断优先级选择结果。数组元素没有明确上下文时会计算 best common type；若没有单一候选覆盖其他成员，可能得到 union。

```ts
const values = [1, null] // Depends on strictNullChecks and context
const handler: (event: MouseEvent) => void = event => {
  console.log(event.clientX)
}
```

第二个例子中的参数类型来自 contextual typing，而非参数自身注解。

## 多位置推断

同一类型参数出现在多个协变输出候选时可能合成 union，在逆变参数候选中可能推成交叉或公共可接受类型；实际结果还受约束、优先级和编译器策略影响。

`NoInfer<T>` 保留类型关系，但阻止该位置贡献推断候选：

```ts
function choose<C extends string>(
  options: readonly C[],
  initial?: NoInfer<C>,
): C {
  return initial ?? options[0]
}

choose(['red', 'green'] as const, 'blue') // Error
```

默认类型参数只在没有可用推断结果时回退，不是每个不匹配候选的兜底。overload 通常先选可用签名；从 overload 类型做 conditional infer 时往往使用最后签名。mapped/conditional type 还可能延迟求值，使结果看似反直觉。

复杂 API 不应把编译器内部候选顺序当稳定契约。必要时增加显式类型参数、拆分函数或使用 overload，让错误信息和行为更可预测。
