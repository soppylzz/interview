# 数组与遍历

数组是带 length 和整数索引语义的对象。稀疏数组的空槽不同于值为 undefined；不同迭代方法可能跳过空槽或把它视为 undefined，业务代码应避免无意创建稀疏数组。

`push/pop/splice/sort/reverse` 等修改原数组；`map/filter/slice/concat` 返回新数组，但元素对象仍共享引用；现代 `toSorted/toReversed/toSpliced/with` 提供非破坏性版本。

`for` 控制最强，`for...of` 按 iterable 取值，`forEach` 不能通过 return/break 中断且不等待 async callback。`some/every/find` 可短路，map 用于一一映射，reduce 适合明确的累积过程。

sort 默认按字符串比较；数值排序需 comparator `(a, b) => a - b`。现代规范要求稳定排序，但 comparator 必须保持纯粹、反对称和传递性。
