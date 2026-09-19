# this 与函数调用

普通函数的 this 由调用方式决定：`obj.fn()` 隐式绑定 obj；`call/apply/bind` 显式指定；`new Fn()` 绑定新对象。严格模式下普通调用 `fn()` 的 this 是 undefined，非严格脚本可能替换为全局对象。

箭头函数没有自己的 this、arguments、super 和 new.target，而是捕获外层绑定，不能作为构造器。把 method 赋给变量或作为裸 callback 传递会丢失接收者。

`call(thisArg, ...args)` 与 `apply(thisArg, args)` 立即调用；`bind` 返回绑定 this 和部分参数的新函数。绑定函数再用 new 调用时，new 的实例绑定优先于绑定的 this。

DOM 普通监听函数中的 this 通常等于 currentTarget，箭头函数仍使用外层 this。class method 不会自动 bind。`globalThis` 是全局对象访问入口，并不等于任意函数中的 this。
