# namespace 与 module

包含顶层 `import`、`export` 或 `export {}` 的文件是 module，其顶层声明仅在文件内可见；没有这些标记的文件通常是 script，多个 script 的顶层声明会进入共享全局作用域。

```ts
export {} // Force this file to be a module
```

## namespace

namespace 是 TypeScript 组织全局代码的历史方案。非 ambient namespace 通常会生成一个对象及立即执行函数，把导出成员挂到对象上，因此同时影响类型空间和运行时产物。

ES Module 通过文件和显式 import/export 建立依赖图，便于浏览器、Node 和 bundler 静态分析。现代应用通常优先使用 ESM。namespace 仍可用于描述传统全局库、组织 ambient 声明，或与 class/function/enum 做声明合并。

## 三种容易混淆的 module

- ES Module：真实的源码模块和运行时依赖。
- `declare module 'pkg'`：为指定模块名提供或补充类型声明。
- ambient module：描述运行时已经存在、当前文件不实现的模块。

`declare module` 不会创建可加载的 JavaScript 文件。

## 声明合并

同名 interface 可合并；namespace 可与 class、function、enum 合并，为其静态对象补充成员。合并依赖声明顺序和导出可见性，不应作为普通应用拆分模块的替代品。

`import type`、`export type` 明确依赖仅存在于类型空间，编译后可以擦除，从而减少运行时循环依赖和意外副作用；若某符号同时作为值使用，就必须正常导入。
