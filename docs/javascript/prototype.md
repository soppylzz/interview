# 原型、继承与 class

每个普通对象有内部 `[[Prototype]]`。读取自身没有的属性时沿原型链查找；给对象赋值通常创建/修改自身属性，遮蔽原型同名成员。

构造函数的 `.prototype` 是 new 实例默认原型对象，不等于构造函数自身的原型。`new Fn(args)` 大致会创建对象、连接 `Fn.prototype`、以新对象调用 Fn，并在 Fn 显式返回对象时采用该对象。

`Object.create(proto)` 直接指定原型；读原型用 `Object.getPrototypeOf`。运行中频繁 `setPrototypeOf` 会破坏引擎优化，应避免。

class 是基于原型的语法与语义封装，默认严格模式。`extends` 连接构造器和实例原型链，派生 constructor 在使用 this 前必须 `super()`。`#private` 由语言运行时强制，和命名约定不同。

`instanceof` 检查构造器 prototype 是否在对象原型链上，并可被 `Symbol.hasInstance` 自定义，不代表对象一定由该构造器实际创建。
