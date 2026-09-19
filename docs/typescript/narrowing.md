# 类型收窄与类型守卫

控制流分析根据运行时检查、赋值、return、throw 和不可达分支缩小变量的可能类型。

```ts
function format(value: string | number) {
  if (typeof value === 'string') return value.trim()
  return value.toFixed(2)
}
```

`typeof` 适合原始类型，`instanceof` 检查原型链，`in` 检查属性存在，相等性可让两个变量的可能类型取交集。truthiness 会同时排除 `0`、`''`、`false` 等值，因此只想排除 null 时应写 `value != null` 或显式比较。

## 自定义守卫

```ts
function isError(value: unknown): value is Error {
  return value instanceof Error
}

function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new TypeError('Expected string')
}
```

类型谓词是开发者给编译器的承诺；实现错误会制造假安全。assertion function 可以断言普通条件，或断言某值属于目标类型，失败路径必须中断执行。

可辨识联合通过共同字面量字段收窄。`switch` 的 default 中把剩余值赋给 `never`，新增成员时即可得到编译错误。

类型断言 `value as T` 不会生成校验代码，也不会证明未知数据满足 T。外部输入需要 parser/schema 在运行时验证，再把验证结果交给静态类型系统。
