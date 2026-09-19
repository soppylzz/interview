# 对象与属性描述符

属性分为 data property 和 accessor property。data descriptor 使用 value/writable，accessor descriptor 使用 get/set；两类都可配置 enumerable、configurable。

`Object.keys` 返回自身可枚举字符串键；`for...in` 还遍历原型链上的可枚举字符串键；`Reflect.ownKeys` 返回自身字符串和 Symbol 键。复制和序列化前必须明确需要哪类属性。

`preventExtensions` 禁止新增自身属性；`seal` 还让现有属性不可配置；`freeze` 再让 data property 不可写。三者都只作用当前对象一层，嵌套对象需递归处理，且外部资源状态不会冻结。

常规自身键顺序大致为整数索引升序、其他字符串插入顺序、Symbol 插入顺序，但业务协议最好不要依赖对象顺序表达有序集合。
