# 函数类型与重载

函数类型可写成箭头形式、对象 call signature 或 construct signature：

```ts
type Fn = (value: string) => number
type Callable = { (value: string): number; description: string }
type Constructor = new (name: string) => { name: string }
```

可选参数必须在必选参数之后；默认参数在调用类型中表现为可省略；rest parameter 通常用数组或 tuple 描述。TypeScript 允许把参数较少的函数赋给参数较多的回调，因为额外实参在 JavaScript 中可被忽略。

## 重载

```ts
function parse(value: string): string[]
function parse(value: Uint8Array): string
function parse(value: string | Uint8Array): string[] | string {
  return typeof value === 'string' ? value.split(',') : new TextDecoder().decode(value)
}
```

调用者只能看到 overload signatures，implementation signature 必须兼容所有重载，但不能被直接调用。输入输出只是同一算法的类型关联时优先泛型；固定参数集合可用 union；参数数量或返回协议明显不同才用 overload。

显式 `this` parameter 只参与类型检查，不进入运行时参数。`ThisType<T>` 是 contextual typing marker，常用于对象字面量方法，但要求启用相应的 `noImplicitThis` 检查。

async 函数总返回 Promise，return/throw 分别变成 resolve/reject。`Awaited<T>` 表达 await 后递归解包的结果，比只匹配一层 `Promise<infer U>` 更准确。
