# 变量、作用域与执行上下文

`var` 是函数或全局作用域，可重复声明；`let/const` 是块级作用域，声明前处于暂时性死区。`const` 限制 binding 重新赋值，并不冻结对象。

代码执行时，标识符沿当前词法环境的外层引用查找，这条静态决定的链就是作用域链。函数作用域由定义位置决定，不由调用位置决定。

声明提升描述绑定在执行前已建立：var 初始化为 undefined；function declaration 通常连同函数值初始化；let/const/class 已建立但未初始化，提前访问抛 ReferenceError。

classic script 的某些顶层 var/function 会成为 Window 属性；顶层 let/const 不会。ES Module 有独立 module scope，默认严格模式。`globalThis` 提供跨 Window、Worker 和 Node 的统一全局引用，但各环境暴露的成员不同。

`with` 和直接 eval 会让名称解析依赖运行时，降低可读性、优化和静态分析能力，严格模式禁用 with。
