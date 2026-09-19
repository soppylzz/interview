# 类型健全性与边界

健全类型系统保证“通过检查的程序不会发生某类错误”。TypeScript 为兼容 JavaScript 和保持易用性，有意接受一些不能完全保证的行为。

## 常见不健全入口

- 可变数组近似协变，可能通过宽类型写入错误成员。
- 方法参数保留双变，callback 可能只接受更窄类型。
- 未开启 `noUncheckedIndexedAccess` 时，越界索引仍可能被视为元素类型。
- 类型断言、non-null assertion 和 any 直接绕过证明。
- `.d.ts` 只是对运行时代码的声明，二者可能不一致。

```ts
const names: string[] = []
const first = names[0] // Runtime value is undefined
```

外部数据应通过 schema/parser 做运行时校验，成功后再得到静态类型。不要只写 `JSON.parse(text) as User`。

## 模拟名义类型

```ts
declare const userIdBrand: unique symbol
type UserId = string & { readonly [userIdBrand]: true }
```

brand 能阻止普通 string 被误当 UserId，但创建 brand 的函数必须在可信边界验证或规范化，否则断言仍可伪造安全。

工程中的目标是让关键边界可靠，同时保持 JavaScript 生态可用。对金钱、权限和外部输入采用更严格校验；对局部 UI 映射可接受可控便利，但应限制 any/断言的传播范围。
