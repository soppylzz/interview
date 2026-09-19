# Number、BigInt 与日期

Number 使用 IEEE 754 双精度浮点，很多十进制小数不能精确表示，所以 `0.1 + 0.2 !== 0.3`。比较计算结果可按业务量级使用容差；金额常使用最小整数单位或专用 decimal 库。

安全整数范围由 `Number.isSafeInteger` 判断。NaN 表示无效数值结果，应用 `Number.isNaN`；Infinity 可参与运算；Object.is 可区分正负零。

BigInt 表示任意精度整数，不能和 Number 直接算术混用，也不适合小数；JSON 默认不能直接序列化 BigInt。

Date 内部是自 Unix epoch 起的毫秒时间戳，展示受时区影响。无时区日期字符串解析易产生歧义，应传输 ISO 时间戳/明确时区，并把“日期”“本地时间”“瞬时”区分建模。
