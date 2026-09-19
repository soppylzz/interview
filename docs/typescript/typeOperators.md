# 类型操作符

`keyof T` 取得 T 的属性键联合。字符串索引签名会让结果包含 `string | number`，因为 JavaScript 数字属性会转成字符串；数字索引通常产生 `number`。

类型位置的 `typeof value` 读取某个值的静态类型，与运行时 `typeof value` 返回字符串标签不同。

```ts
const status = { idle: 0, running: 1 } as const
type StatusKey = keyof typeof status
type StatusValue = (typeof status)[StatusKey] // 0 | 1
type Item<T extends readonly unknown[]> = T[number]
```

indexed access `T[K]` 读取属性类型；K 为 union 时结果也是对应属性类型的 union。数组/tuple 的 `T[number]` 可取得元素联合。

## as const 与 satisfies

`as const` 阻止字面量 widening，并把对象属性和数组推断为 readonly/readonly tuple。它是断言，不做深层运行时冻结。

`satisfies` 检查表达式可赋给目标类型，同时尽量保留表达式自身的具体类型：

```ts
const routes = {
  home: '/',
  user: '/users/:id',
} satisfies Record<string, `/${string}`>
```

类型注解让变量采用注解类型；`as` 要求编译器相信断言；`satisfies` 进行兼容性检查但不把结果替换成目标类型。

表达式后的 `!` 是 non-null assertion，移除 null/undefined；类字段后的 `!` 是 definite assignment assertion，跳过属性初始化检查。二者都不产生运行时保护。
