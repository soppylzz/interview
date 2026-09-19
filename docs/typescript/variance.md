# 协变、逆变与 UnionToIntersection

variance 描述泛型容器的类型关系如何随类型参数变化。若 `Dog` 可赋值给 `Animal`：

- 协变：`Producer<Dog>` 可赋值给 `Producer<Animal>`。
- 逆变：`Consumer<Animal>` 可赋值给 `Consumer<Dog>`。
- 不变：两个方向都不成立。
- 双变：两个方向都允许，检查更宽松但可能不健全。

只产生 `T` 的返回值位置通常协变；消费 `T` 的函数参数位置在严格检查下通常逆变。

```ts
type Producer<T> = () => T
type Consumer<T> = (value: T) => void
```

## strictFunctionTypes

开启 `strictFunctionTypes` 后，函数类型的参数按逆变方向检查。为兼容常见 JavaScript API，方法声明仍常保留双变行为：

```ts
type Property<T> = { handle: (value: T) => void }
type Method<T> = { handle(value: T): void }
```

可变数组在 TypeScript 中近似协变，因此可能把 `Dog[]` 当成 `Animal[]` 后写入其他 Animal，形成不健全行为。只读数组能消除写入入口。

`in`、`out` annotation 可声明参数预期被消费或产生，主要用于检查和优化结构比较；它不能强行改变类型真实结构带来的 variance，也不应只为绕过错误添加。

## UnionToIntersection

```ts
type UnionToIntersection<U> = (
  U extends unknown ? (value: U) => void : never
) extends (value: infer I) => void
  ? I
  : never

type Result = UnionToIntersection<{ a: 1 } | { b: 2 }>
// { a: 1 } & { b: 2 }
```

推导过程：

1. 裸 `U` 触发分布，得到函数联合。
2. 整个联合与单个函数比较。
3. 同一个参数类型 `I` 必须能满足所有成员，逆变位置合并为交叉类型。

从重载函数做条件推断时，通常只检查最后一个签名，因为它应是最宽泛的实现入口；不要把重载推断结果当成逐签名联合。
