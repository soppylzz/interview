# interface 与 type

interface 和 type alias 都能描述对象与函数结构，并可被 class implements。type 还可直接表示 union、primitive、tuple、mapped type 和 conditional type。

## 扩展和冲突

interface 使用 `extends` 时，重名属性必须保持兼容，冲突会在声明处报错。intersection 会先形成交叉，冲突属性可能化为 `never`，错误延迟到使用位置：

```ts
interface A { value: string }
interface B extends A { value: string } // Must remain compatible

type C = { value: string } & { value: number }
// C['value'] is never
```

同名 interface 会声明合并，这适合库的插件扩展和全局声明；type alias 不会合并，重复声明直接报错。

class implements 只检查实例侧，不检查 constructor 和静态成员。若需要构造器约束，应单独声明 `new (...args) => Instance` 类型。

interface 与 type 在错误信息、递归支持和编译性能上的差异常随 TypeScript 版本与具体结构变化，不应背成绝对规则。公开库若需要消费者扩展，interface 往往更合适；应用内部的联合、映射和组合类型通常用 type。普通对象结构可遵循团队一致性选择。
