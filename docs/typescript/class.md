# 对象、类与访问控制

`prop?: T` 表示属性可以不存在；`prop: T | undefined` 表示属性必须存在，但值可为 undefined。开启 `exactOptionalPropertyTypes` 后二者差异更明确。

对象字面量直接赋给目标类型时会触发 excess property checking，用于捕捉拼写错误；先赋给变量后按普通结构兼容性检查，因此额外属性可能被允许。这不是运行时删除属性。

index signature 要覆盖所有明确属性：若 `[key: string]: number`，每个字符串命名属性都必须可赋给 number。

## Class 类型

- `public/protected/private` 是 TypeScript 检查，普通 private 默认仍生成可访问的 JavaScript 属性。
- JavaScript `#private` 由运行时强制私有。
- parameter property 会声明并初始化实例字段，因此会生成赋值代码。
- abstract class 可携带实现、状态和构造逻辑；interface 只描述结构。

`typeof MyClass` 是 constructor 与静态侧类型，`MyClass` 在类型位置通常表示实例侧。implements 只检查实例侧。

含 private/protected 成员的两个类只有在这些成员来自同一声明链时才兼容，这让结构化系统出现部分名义特征。`readonly` 只限制 TypeScript 中通过该属性写入，不冻结对象，也不自动深只读。
