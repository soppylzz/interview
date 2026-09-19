# enum、常量对象与字面量联合

普通 enum 同时创建类型和运行时对象。numeric enum 通常生成 name 到 value 与 value 到 name 的反向映射；string enum 只生成正向属性。heterogeneous enum 混合两者，可读性和约束较差，应谨慎使用。

```ts
enum Direction {
  Up,
  Down,
}
```

`const enum` 的成员通常在使用处内联，可减少运行时对象，但跨包发布、版本错配和 isolated compilation 会带来限制。不要在公共声明中随意暴露 ambient const enum。

## 三种建模方式

```ts
const Status = {
  Idle: 'idle',
  Running: 'running',
} as const

type StatusKey = keyof typeof Status
type StatusValue = (typeof Status)[StatusKey]
type StatusLiteral = 'idle' | 'running'
```

字面量联合只有类型，无运行时对象；`as const` 对象提供运行时查表和可推导类型；enum 还提供独立语义与特定运行时形式。需要和外部 JSON 字符串交互时，常量对象/union 通常更直观；确实需要 enum 对象、反向映射或既有 API 契约时再选 enum。

ambient enum 只声明外部已经存在的对象，不生成实现；其成员推断也可能比普通 enum 更保守。
