# JavaScript 学习清单

> 用于筛选前端面试中的 JavaScript 语言知识。重点理解语言语义、运行时行为和常见边界，而不是只记忆手写题答案。

## 内容边界

- 浏览器任务调度、DOM 与 Web API 放在 `docs/browser`。
- Node.js Event Loop、Stream 和进程模型放在 `docs/node`。
- TypeScript 类型系统放在 `docs/typescript`。
- 手写实现代码放在 `handwrite`，本目录解释实现依赖的语言原理。

## P0：建议优先学习

### 1. 数据类型与类型判断 `dataTypes.md`

- [ ] 原始类型与对象类型的区别
- [ ] `undefined`、`null`、Boolean、Number、BigInt、String、Symbol
- [ ] `typeof null`、函数和未声明变量的结果
- [ ] `instanceof`、`Array.isArray()`、`Object.prototype.toString`
- [ ] 包装对象与自动装箱
- [ ] 值传递与“对象引用按值传递”

### 2. 类型转换与相等性 `coercion.md`

- [ ] ToPrimitive、ToString、ToNumber、ToBoolean 的基本过程
- [ ] falsy 值有哪些
- [ ] `==` 与 `===` 的差异和常见边界
- [ ] `Object.is()` 如何处理 NaN 与正负零
- [ ] `+` 运算符为什么既能相加又能拼接
- [ ] `||` 与 `??` 的差异

### 3. 变量、作用域与执行上下文 `scope.md`

- [ ] `var`、`let`、`const` 的作用域和重复声明
- [ ] 声明提升与暂时性死区
- [ ] 词法环境、作用域链和变量查找
- [ ] global scope、function scope、block scope、module scope
- [ ] script 顶层变量与 `globalThis` 的关系
- [ ] eval、with 为什么不利于静态分析

### 4. this 与函数调用 `this.md`

- [ ] 默认、隐式、显式和 `new` 绑定
- [ ] 箭头函数为什么没有自己的 `this`
- [ ] 丢失调用者后 this 为什么变化
- [ ] `call`、`apply`、`bind` 的区别
- [ ] class method、event listener、timer callback 中的 this
- [ ] `globalThis` 与浏览器 Window、Worker、Node global 的关系

### 5. 函数与参数 `function.md`

- [ ] 函数声明、函数表达式、箭头函数
- [ ] `arguments` 与 rest parameter
- [ ] 默认参数的求值和作用域
- [ ] 函数对象、name、length 属性
- [ ] 高阶函数、纯函数和副作用
- [ ] 尾调用、递归与调用栈

### 6. 闭包 `closure.md`

- [ ] 闭包与词法作用域的关系
- [ ] 循环和异步回调中的闭包
- [ ] 私有状态、工厂函数、柯里化和缓存
- [ ] 闭包捕获的是 binding 而不是值快照
- [ ] 闭包如何延长对象生命周期
- [ ] 如何区分合理保留与内存泄漏

### 7. 原型、继承与 class `prototype.md`

- [ ] `prototype`、对象原型与原型链
- [ ] 属性查找和遮蔽过程
- [ ] constructor function 与 `new` 的步骤
- [ ] `Object.create()`、`Object.getPrototypeOf()`、`Object.setPrototypeOf()`
- [ ] `class`、`extends`、`super` 的运行时本质
- [ ] static field、private field 与继承
- [ ] 手写 `new`、`instanceof` 的原理

### 8. 对象与属性描述符 `object.md`

- [ ] 自有属性、继承属性和可枚举属性
- [ ] data property 与 accessor property
- [ ] writable、enumerable、configurable
- [ ] `Object.keys`、`for...in`、Reflect.ownKeys 的差异
- [ ] `preventExtensions`、`seal`、`freeze` 的区别
- [ ] 浅冻结与深冻结
- [ ] 属性顺序能保证到什么程度

### 9. Promise 与 async/await `promise.md`

- [ ] Promise 三种状态与 resolution procedure
- [ ] `then` 为什么返回新 Promise
- [ ] 值穿透、错误冒泡和 finally
- [ ] thenable assimilation
- [ ] `all`、`allSettled`、`race`、`any`
- [ ] async 函数返回值和 await 的语义
- [ ] 串行、并发、并行与并发限制
- [ ] unhandled rejection 的形成

## P1：高频补充

### 10. 数组与遍历 `array.md`

- [ ] 稀疏数组与空槽
- [ ] 可变方法与非破坏性方法
- [ ] `for`、`for...of`、`forEach`、`map`、`reduce`
- [ ] `some`、`every`、`find` 的短路行为
- [ ] sort 默认规则、稳定性与 comparator
- [ ] array-like 与 iterable 的区别

### 11. Map、Set 与弱引用集合 `collections.md`

- [ ] Map 与 Object 的 key、顺序、原型和增删差异
- [ ] Set 的相等性和去重边界
- [ ] WeakMap、WeakSet 为什么不可枚举
- [ ] 弱引用集合适合保存什么元数据
- [ ] WeakRef、FinalizationRegistry 的能力边界

### 12. 浅拷贝、深拷贝与结构化克隆 `copy.md`

- [ ] 展开语法、assign、slice 为什么是浅拷贝
- [ ] JSON 序列化方案会丢失什么
- [ ] `structuredClone()` 支持的类型和 transferable
- [ ] 循环引用、共享引用和原型如何处理
- [ ] 手写 deepClone 的范围如何定义
- [ ] 不可变更新与深拷贝的区别

### 13. 迭代器与生成器 `iterator.md`

- [ ] iterable、iterator 与 iterator result
- [ ] `Symbol.iterator` 如何驱动 `for...of`
- [ ] generator 的 yield、next、return、throw
- [ ] `yield*` 委托
- [ ] async iterator 与 `for await...of`
- [ ] iterator cleanup 与资源释放

### 14. Proxy 与 Reflect `proxyReflect.md`

- [ ] Proxy trap 与内部操作的关系
- [ ] Reflect 为什么适合在 trap 中转发默认行为
- [ ] Proxy invariant 是什么
- [ ] receiver 对 getter、setter 和原型链的影响
- [ ] 响应式、校验和虚拟对象的应用
- [ ] Proxy 的身份、性能和私有字段限制

### 15. JavaScript Module `module.md`

- [ ] ESM 的静态结构、live binding 和严格模式
- [ ] default export 与 named export
- [ ] dynamic import 与 top-level await
- [ ] 循环依赖的初始化顺序
- [ ] module scope 与 script scope
- [ ] CommonJS 差异放在哪些运行时理解

### 16. 错误与资源管理 `error.md`

- [ ] Error 类型、cause 与自定义错误
- [ ] throw、try/catch/finally 的控制流
- [ ] 同步异常与 Promise rejection
- [ ] 错误边界如何保留上下文
- [ ] AbortSignal 与取消的协作模型
- [ ] 显式资源管理和 dispose 的适用场景

### 17. 内存与垃圾回收 `memory.md`

- [ ] 栈、堆和对象可达性
- [ ] 标记清除与分代回收的理解边界
- [ ] 全局变量、闭包、timer、监听器和 detached DOM
- [ ] WeakMap 为什么不阻止 key 回收
- [ ] 内存峰值、缓存和泄漏如何区分
- [ ] 浏览器 Heap Snapshot 的基本思路

## P2：有余力再学

### 18. Number、BigInt 与日期 `numberAndTime.md`

- [ ] IEEE 754 与浮点误差
- [ ] 安全整数、NaN、Infinity 和正负零
- [ ] BigInt 的运算限制
- [ ] 金额计算的常见方案
- [ ] Date、时区、时间戳和日期字符串解析

### 19. 正则表达式 `regexp.md`

- [ ] 字符类、量词、分组、断言和 flags
- [ ] 捕获组与命名捕获组
- [ ] 贪婪与懒惰匹配
- [ ] lastIndex 与 global/sticky
- [ ] catastrophic backtracking 与 ReDoS

### 20. 常见函数式与手写模式 `patterns.md`

- [ ] debounce、throttle 的时间语义
- [ ] curry、partial、compose、pipe
- [ ] memoize 的缓存 key 与生命周期
- [ ] 发布订阅与观察者模式的区别
- [ ] 并发池、重试、超时和退避
- [ ] LRU、once、promisify 的实现边界

## 综合题

- [ ] 分析一组包含 this、箭头函数、bind 和 new 的输出
- [ ] 逐步说明闭包形成、变量查找和对象何时可回收
- [ ] 手写 Promise 组合方法并处理空输入和 rejection
- [ ] 比较 Object、Map、WeakMap 和 Set
- [ ] 设计支持循环引用与共享引用的 deepClone
- [ ] 解释 class、prototype、constructor 和实例的关系
- [ ] 解释 async/await 如何通过 Promise 与微任务继续执行
- [ ] 判断一段代码使用浅拷贝后为何仍修改了原对象

## 建议取舍

- 时间较少：完成 P0，重点掌握类型、作用域、this、闭包、原型和 Promise。
- 常规准备：完成 P0、P1，并在 `handwrite` 实现常见函数。
- 深入准备：补充 P2，并结合规范或最小代码验证语言边界。
