# 映射类型与内置工具类型

映射类型遍历 `keyof T`，可读取原属性类型并增删修饰符：

```ts
type MyPartial<T> = { [K in keyof T]?: T[K] }
type MyRequired<T> = { [K in keyof T]-?: T[K] }
type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
type Mutable<T> = { -readonly [K in keyof T]: T[K] }
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
type MyOmit<T, K extends PropertyKey> = Pick<T, Exclude<keyof T, K>>
type MyRecord<K extends PropertyKey, V> = { [P in K]: V }
```

直接形如 `[K in keyof T]` 的 homomorphic mapped type 可保留并转换原属性的 readonly/optional 修饰符。

## Key Remapping

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type WithoutFunctions<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K]
}
```

`as` 可重命名 key；映射到 `never` 会过滤该 key。模板字面量类型可生成事件名、路径和访问器，`Uppercase`、`Lowercase`、`Capitalize`、`Uncapitalize` 执行内置字符串变换。

## 函数与 Promise 工具

```ts
type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? P : never
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never
type MyConstructorParameters<T extends abstract new (...args: any[]) => any> =
  T extends abstract new (...args: infer P) => any ? P : never
type MyInstanceType<T extends abstract new (...args: any[]) => any> =
  T extends abstract new (...args: any[]) => infer I ? I : never
```

内置 `Awaited<T>` 还会处理 null/undefined、递归 PromiseLike 和 thenable。生产代码应优先使用标准工具类型，自定义实现用于理解推导过程。
