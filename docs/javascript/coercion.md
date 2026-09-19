# 类型转换与相等性

对象参与原始运算时先执行 ToPrimitive，通常依次尝试 `Symbol.toPrimitive`、`valueOf` 和 `toString`；得到原始值后再按运算符转换。

falsy 只有 `false`、`0`、`-0`、`0n`、`NaN`、空字符串、`null`、`undefined`。所有普通对象都是真值，包括空数组和包装对象。

`===` 不做类型转换，但 `NaN !== NaN` 且正负零相等；`Object.is` 认为 NaN 等于自身、正负零不同。`==` 按抽象相等算法转换，规则复杂，只有 `value == null` 同时匹配 null/undefined 是较常见的有意用法。

二元 `+` 在 ToPrimitive 后，只要一侧是字符串就拼接，否则数值相加。BigInt 不能与 Number 直接混算。`||` 根据 truthiness 回退，会误伤 0、空字符串；`??` 只在 null/undefined 时回退。
