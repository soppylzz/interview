# 分布式条件类型

条件类型写作 `T extends U ? X : Y`。这里的 `extends` 判断 `T` 是否可赋值给 `U`，并不表示运行时继承。

## 分布条件

当检查位置是裸类型参数时，联合类型会逐项代入：

```ts
type ToArray<T> = T extends unknown ? T[] : never
type Result = ToArray<string | number> // string[] | number[]
```

“裸”表示 `T` 没有被 tuple、对象或其他类型结构包裹。`T extends unknown` 和 `T extends any` 常被用来主动触发分布；前者通常更能表达“任意未知类型”。

用 tuple 包裹两侧可关闭分布：

```ts
type IsString<T> = [T] extends [string] ? true : false
type Result = IsString<'a' | 1> // false
```

## never 的特殊表现

`never` 可看作空联合。分布时没有成员可以代入，因此结果仍为 `never`：

```ts
type IsNeverWrong<T> = T extends never ? true : false
type A = IsNeverWrong<never> // never

type IsNever<T> = [T] extends [never] ? true : false
type B = IsNever<never> // true
```

## 常见工具类型

```ts
type MyExclude<T, U> = T extends U ? never : T
type MyExtract<T, U> = T extends U ? T : never
type MyNonNullable<T> = T extends null | undefined ? never : T
```

`infer` 可在 true 分支引入待推断变量：

```ts
type ElementOf<T> = T extends readonly (infer E)[] ? E : never
type Return<T> = T extends (...args: any[]) => infer R ? R : never
type Unwrap<T> = T extends PromiseLike<infer U> ? Unwrap<U> : T
```

联合转交叉还会利用分布生成函数联合，再利用函数参数的逆变位置推断交叉类型，详见 `variance.md`。
