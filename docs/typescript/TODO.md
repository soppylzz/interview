# TypeScript 学习清单

> 用于筛选前端面试中的 TypeScript 高频知识点。重点理解类型关系、推导过程和编译配置，避免只背工具类型的最终写法。

## 已考虑

### 分布式条件类型 `conditionalTypes.md`

- [ ] 条件类型 `T extends U ? X : Y` 判断的是可赋值关系
- [ ] 什么是裸类型参数，为什么 `T` 为联合类型时会逐项分发
- [ ] `T extends unknown`、`T extends any` 常用于什么场景
- [ ] `[T] extends [U]` 为什么可以关闭分布
- [ ] `never` 参与分布式条件类型时为什么容易产生意外结果
- [ ] `Exclude`、`Extract`、`NonNullable` 如何利用分布式条件类型
- [ ] `infer` 如何在条件类型中提取函数参数、返回值、Promise 内部类型和数组元素
- [ ] 联合类型转交叉类型为什么同时依赖分布和逆变位置推导

### 协变、逆变与 UnionToIntersection `variance.md`

- [ ] 协变、逆变、不变和双变分别表示什么
- [ ] 返回值位置为什么通常协变，函数参数位置为什么通常逆变
- [ ] `strictFunctionTypes` 对函数属性和方法声明的检查为何不同
- [ ] TypeScript 的结构化类型系统如何根据类型参数的使用位置推导 variance
- [ ] 数组可变性为什么会带来类型系统中的不健全行为
- [ ] `in`、`out` variance annotation 的作用和使用限制
- [ ] `UnionToIntersection<T>` 如何通过分布式条件类型构造函数联合
- [ ] 为什么在函数参数位置执行 `infer` 可以得到交叉类型
- [ ] 函数重载类型参与推导时为什么通常只使用最后一个签名

### namespace 与 module `namespaceAndModule.md`

- [ ] 文件在什么情况下是 script，什么情况下是 module
- [ ] script 顶层声明为什么会进入共享全局作用域
- [ ] `export {}` 如何把没有导入导出的文件变成 module
- [ ] namespace 在运行时会生成什么 JavaScript
- [ ] ES Module 与 namespace 在作用域、依赖关系和产物上的区别
- [ ] 为什么现代应用代码通常优先使用 ES Module
- [ ] namespace 仍适合哪些声明文件和全局脚本场景
- [ ] `declare module`、ambient module 与 ES Module 的区别
- [ ] namespace、class、function、enum 如何进行声明合并
- [ ] `import type`、`export type` 如何表达仅类型依赖

### 装饰器 `decorator.md`

- [ ] 装饰器解决什么问题，装饰器表达式何时求值
- [ ] 类、方法、字段和 accessor 装饰器分别接收什么上下文
- [ ] 标准装饰器如何替换值、注册 initializer
- [ ] 装饰器组合时的求值顺序和调用顺序
- [ ] 标准装饰器与 `experimentalDecorators` legacy 装饰器的签名和行为差异
- [ ] 为什么标准装饰器不能直接配合 `emitDecoratorMetadata`
- [ ] 参数装饰器和 `reflect-metadata` 属于哪套装饰器模型
- [ ] 装饰器在依赖注入、日志、缓存和访问控制中的常见使用方式
- [ ] 装饰器带来的隐藏控制流、类型保持和框架耦合问题

## P0：建议优先学习

### 1. TypeScript 类型系统基础 `typeSystem.md`

- [ ] TypeScript 在 JavaScript 之上增加了什么，编译后哪些类型信息会被擦除
- [ ] 静态类型检查能保证什么，为什么不能替代运行时数据校验
- [ ] 结构化类型与名义类型的区别
- [ ] assignable、subtype 和类型兼容性的基本关系
- [ ] 类型注解、类型推断和 contextual typing 的区别
- [ ] literal widening 为什么会把 `"GET"` 推断为 `string`
- [ ] union 与 intersection 分别如何组合类型
- [ ] 可辨识联合为什么适合表达互斥状态
- [ ] TypeScript 为什么允许部分不健全但符合 JavaScript 习惯的类型行为

### 2. 特殊类型 `specialTypes.md`

- [ ] `any` 与 `unknown` 的赋值、访问和调用差异
- [ ] `never` 表示什么，如何用于穷尽检查和过滤联合类型
- [ ] `void`、`undefined`、`null` 的区别
- [ ] 返回 `void` 的函数类型为什么可以接收一个实际返回值的函数
- [ ] `object`、`Object`、`{}` 的范围有什么区别
- [ ] `unknown` 为什么适合作为不可信输入的起点
- [ ] `never` 与联合类型、条件类型相遇时的化简规则
- [ ] `strictNullChecks` 如何改变 null 和 undefined 的类型关系

### 3. 类型收窄与类型守卫 `narrowing.md`

- [ ] `typeof`、`instanceof`、`in` 和相等性检查如何收窄类型
- [ ] truthiness narrowing 为什么可能误伤 `0`、空字符串等合法值
- [ ] 可辨识联合如何根据 discriminant 收窄
- [ ] 自定义类型谓词 `value is T` 的作用和风险
- [ ] assertion function 中 `asserts condition` 与 `asserts value is T`
- [ ] 控制流分析如何跟踪赋值、return、throw 和不可达分支
- [ ] 穷尽检查如何利用 `never`
- [ ] 为什么类型断言不会执行运行时检查，也不会真正收窄未知数据

### 4. 泛型与类型推断 `generics.md`

- [ ] 泛型解决类型之间的什么关联问题
- [ ] 泛型函数、接口、类型别名和类的类型参数作用域
- [ ] `T extends U` 泛型约束与条件类型中的 `extends` 有何不同
- [ ] 默认类型参数以及必选、可选类型参数的顺序
- [ ] TypeScript 如何从函数参数和上下文推断类型参数
- [ ] `keyof` 约束如何保证动态属性访问安全
- [ ] 为什么泛型函数体必须对约束范围内的所有类型都成立
- [ ] 何时应使用泛型，何时联合类型或函数重载更清晰
- [ ] `const` type parameter 能保留哪些字面量信息

### 5. 类型操作符 `typeOperators.md`

- [ ] `keyof T` 会产生什么类型，字符串和数字索引签名如何影响结果
- [ ] 类型位置中的 `typeof` 与 JavaScript `typeof` 的区别
- [ ] indexed access `T[K]` 如何读取属性、联合 key 和数组元素类型
- [ ] `keyof typeof` 为什么常与常量对象配合使用
- [ ] `as const` 如何影响字面量、readonly 属性和 tuple 推断
- [ ] `satisfies` 与类型注解、类型断言的区别
- [ ] `satisfies` 为什么可以检查约束同时保留表达式的具体类型
- [ ] non-null assertion `!` 与 definite assignment assertion 的区别

### 6. interface 与 type `interfaceAndType.md`

- [ ] interface 与 type alias 都能描述哪些对象类型
- [ ] `extends` 与 intersection 在冲突属性上的行为差异
- [ ] interface declaration merging 的规则
- [ ] type alias 为什么可以直接表示联合、原始类型、tuple 和条件类型
- [ ] interface 和 type 在错误提示、递归类型和性能上的实际差异不应被夸大
- [ ] class 的 `implements` 只检查实例侧意味着什么
- [ ] 公开库扩展点与应用内部类型分别如何选择 interface 或 type

### 7. 映射类型与内置工具类型 `mappedTypes.md`

- [ ] 映射类型如何遍历 `keyof T`
- [ ] `readonly`、optional modifier 如何添加或移除
- [ ] key remapping 中 `as` 的作用
- [ ] `Partial`、`Required`、`Readonly`、`Pick`、`Omit`、`Record` 的实现
- [ ] `Parameters`、`ReturnType`、`ConstructorParameters`、`InstanceType` 的实现
- [ ] `Awaited` 如何递归解包 PromiseLike
- [ ] 模板字面量类型如何生成事件名、路径或属性访问器
- [ ] 字符串工具类型 `Uppercase`、`Lowercase`、`Capitalize`、`Uncapitalize`
- [ ] homomorphic mapped type 为什么能保留部分属性修饰符

## P1：高频补充

### 8. 函数类型与重载 `functionTypes.md`

- [ ] function declaration type、call signature、construct signature 的写法
- [ ] 可选参数、默认参数和 rest parameter 如何影响函数类型
- [ ] 函数参数数量为何允许丢弃额外参数
- [ ] overload signatures 与 implementation signature 的关系
- [ ] 联合参数、泛型和函数重载分别适合什么场景
- [ ] 显式 `this` parameter 如何约束函数调用方式
- [ ] `ThisType` 如何借助 contextual typing 提供 `this` 类型
- [ ] async 函数、Promise 返回值与 `Awaited`

### 9. 对象、类与访问控制 `class.md`

- [ ] optional property 与 `T | undefined` 属性的区别
- [ ] readonly 只提供编译期约束意味着什么
- [ ] excess property checking 何时触发，为什么赋给中间变量后表现可能不同
- [ ] index signature 与明确属性如何互相约束
- [ ] `public`、`protected`、`private` 与 JavaScript `#private` 的区别
- [ ] parameter property 会生成什么运行时代码
- [ ] abstract class 与 interface 的区别
- [ ] class 的实例侧与静态侧类型
- [ ] private/protected 成员如何使类类型带有部分名义类型特征

### 10. 声明文件与声明合并 `declarationFiles.md`

- [ ] `.d.ts` 文件只描述类型、不提供运行时实现意味着什么
- [ ] ambient declaration 中 `declare` 的作用
- [ ] 如何为全局变量、全局函数、CommonJS 和 ES Module 编写声明
- [ ] `declare global` 如何从 module 扩展全局类型
- [ ] module augmentation 如何扩展第三方模块
- [ ] interface、namespace、class、function、enum 的合并规则
- [ ] `types`、`typeRoots` 与 `@types` 的查找关系
- [ ] `skipLibCheck` 做了什么，为什么它不能修复错误的库类型

### 11. 模块系统与模块解析 `moduleResolution.md`

- [ ] ESM 与 CommonJS 在导入导出和运行时加载上的区别
- [ ] `module`、`moduleResolution`、`target` 分别控制什么
- [ ] Node.js 的文件扩展名、`package.json type`、exports/imports 如何影响解析
- [ ] `node16`、`nodenext`、`bundler` 模块解析模式适合什么环境
- [ ] `esModuleInterop` 和 `allowSyntheticDefaultImports` 解决什么兼容问题
- [ ] `import type` 为什么可能影响最终产物和循环依赖
- [ ] path alias 只改变类型检查解析时，为什么运行时仍可能找不到模块
- [ ] `moduleDetection` 如何判断一个文件是不是 module

### 12. tsconfig 与严格模式 `tsconfig.md`

- [ ] `include`、`exclude`、`files` 如何确定编译输入
- [ ] `strict` 会启用哪些重要检查
- [ ] `noImplicitAny`、`strictNullChecks`、`strictFunctionTypes` 的作用
- [ ] `noUncheckedIndexedAccess` 为什么会给索引访问加入 undefined
- [ ] `exactOptionalPropertyTypes` 如何区分缺少属性与属性值为 undefined
- [ ] `useUnknownInCatchVariables` 改变了什么
- [ ] `noEmit`、`declaration`、`sourceMap`、`incremental` 的用途
- [ ] `lib` 与 `types` 为什么会改变全局可用类型
- [ ] `extends`、project references、composite 如何组织大型项目

### 13. enum、常量对象与字面量联合 `enum.md`

- [ ] numeric enum、string enum、heterogeneous enum 的运行时产物
- [ ] numeric enum 为什么通常生成反向映射
- [ ] `const enum` 如何内联，以及 isolated compilation 下的注意事项
- [ ] ambient enum 与普通 enum 的差异
- [ ] enum、`as const` 对象、字面量联合的运行时和类型层差异
- [ ] 什么时候确实需要 enum 的运行时对象
- [ ] 如何从常量对象推导 key union 和 value union

### 14. 类型体操常用模式 `typePatterns.md`

- [ ] tuple 与普通数组的判定方式
- [ ] tuple 递归、accumulator 和 variadic tuple
- [ ] template literal type 如何递归解析字符串
- [ ] conditional type 中 `infer` 的协变和逆变推导结果
- [ ] 用 `never` 过滤联合成员或映射类型的 key
- [ ] union 转 tuple 为什么依赖联合类型的内部行为，是否适合生产代码
- [ ] 深度递归类型为什么可能触发 instantiation 过深
- [ ] 类型体操结果如何用双向可赋值或测试工具验证
- [ ] 与 `handwrite/type-challenges` 中的题目联动练习

## P2：有余力再学

### 15. 类型推断进阶 `advancedInference.md`

- [ ] best common type 与 contextual typing
- [ ] 泛型推断中的协变候选、逆变候选和推断优先级
- [ ] `NoInfer<T>` 如何阻止某个位置成为推断来源
- [ ] 泛型参数出现在多个位置时为什么会得到联合、交叉或公共类型
- [ ] overload、conditional type、mapped type 如何影响推断
- [ ] 类型参数默认值何时参与推断失败后的回退
- [ ] 为什么某些复杂推断结果依赖编译器实现细节，不适合作为 API 契约

### 16. 类型健全性与边界 `soundness.md`

- [ ] TypeScript 有意保留了哪些 unsound 行为
- [ ] 数组协变、函数参数双变、索引访问为何可能产生运行时错误
- [ ] 类型断言、non-null assertion 和 `any` 如何逃离类型系统
- [ ] 第三方声明与实际运行时代码不一致时会发生什么
- [ ] 运行时 schema validation 如何与静态类型配合
- [ ] branded type 如何在结构化类型系统中模拟名义类型
- [ ] 类型安全、开发体验和 JavaScript 兼容性之间如何取舍

### 17. 编译过程与产物 `compiler.md`

- [ ] TypeScript 的 parse、bind、check、transform、emit 大致阶段
- [ ] 类型擦除为什么意味着类型信息通常不会进入运行时
- [ ] `target` 如何影响语法降级，`lib` 为什么不负责注入 polyfill
- [ ] Babel、SWC、esbuild 转译 TypeScript 与 `tsc` 类型检查的分工
- [ ] isolatedModules/isolatedDeclarations 为什么限制跨文件推断能力
- [ ] declaration emit 如何从源码生成 `.d.ts`
- [ ] source map 如何把运行时代码映射回 TypeScript 源码

### 18. JavaScript 项目渐进迁移 `migration.md`

- [ ] `allowJs`、`checkJs` 和 `// @ts-check` 的作用
- [ ] 如何用 JSDoc 为 JavaScript 添加类型
- [ ] `@ts-expect-error`、`@ts-ignore`、`@ts-nocheck` 的区别
- [ ] 为什么 `@ts-expect-error` 通常比 `@ts-ignore` 更适合临时兼容
- [ ] 从边界类型、公共 API 到内部实现的迁移顺序
- [ ] 如何逐步启用 strict 选项并管理历史错误
- [ ] 第三方无类型依赖如何通过 `@types` 或临时声明接入

## 综合题

- [ ] 比较 `any`、`unknown`、`never`、`void`，并给出各自适用场景
- [ ] 比较 interface 与 type，并解释声明合并和交叉类型冲突
- [ ] 根据一段代码逐步说明控制流分析如何收窄联合类型
- [ ] 手写 `Partial`、`Required`、`Pick`、`Omit`、`ReturnType`、`Awaited`
- [ ] 解释分布式条件类型并写出关闭分布的方式
- [ ] 推导 `UnionToIntersection`，解释分布、逆变和 `infer` 各自的作用
- [ ] 比较类型注解、`as`、`as const` 和 `satisfies`
- [ ] 分析函数属性与方法声明在 `strictFunctionTypes` 下的差异
- [ ] 判断一个文件是 script 还是 module，并分析顶层声明的作用域
- [ ] 比较 namespace、ES Module 和 ambient module
- [ ] 分析一个 ESM/CommonJS 混用导致的导入或模块解析问题
- [ ] 为一份未知 JSON 数据设计运行时校验和静态类型
- [ ] 解释 legacy decorators 与标准装饰器为什么不能直接互换
- [ ] 从一个实际类型错误中判断问题来自推断、可赋值性还是编译配置

## 建议取舍

- 时间较少：完成 P0，并掌握已考虑内容中的分布式条件类型和协变/逆变。
- 常规准备：完成已考虑、P0、P1，并结合 `handwrite/type-challenges` 手写常见工具类型。
- 深入准备：补充 P2，重点理解类型系统边界和编译配置，不必追求难以维护的极端类型体操。
