# 数据类型与类型判断

JavaScript 有七种原始类型：Undefined、Null、Boolean、Number、BigInt、String、Symbol；其余值都是对象，函数是可调用对象。原始值不可变，对象保存可变属性。

参数传递始终是值传递。传对象时复制的是引用值，所以函数能通过引用修改对象，却不能通过重新赋值参数替换调用方变量。

| 判断方式 | 适用范围 | 边界 |
| --- | --- | --- |
| `typeof` | 原始类型、function | `typeof null === 'object'`，无法细分对象 |
| `Array.isArray` | 数组 | 可跨 realm 工作 |
| `instanceof` | 原型链关系 | 受 realm、原型修改和 Symbol.hasInstance 影响 |
| `Object.prototype.toString` | 内建对象标签 | 可被 Symbol.toStringTag 影响 |

访问原始值方法时会发生临时装箱；`new String('x')` 创建的包装对象是真值且类型为 object，业务中通常不应主动创建。未声明标识符直接访问会报错，但 `typeof missing` 返回 `'undefined'`。
