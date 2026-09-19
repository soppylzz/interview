# TypeScript 编译过程与产物

TypeScript compiler 的流程可粗略分为：

```text
source → parse → bind → check → transform → emit
```

parse 生成语法树；bind 建立 symbol、scope 和声明关系；check 计算类型并验证可赋值性；transform 按 target/module 等改写语法；emit 输出 JavaScript、声明文件和 source map。

类型擦除意味着 interface、type 和大多数注解不会进入运行时。`target` 决定 class、async 等语法是否降级；`lib` 只让检查器知道某环境 API 的类型，不会注入 Promise、fetch 等 polyfill。

Babel、SWC、esbuild 可快速删除 TypeScript 语法并转换代码，但通常不执行完整类型检查。常见工程链路让它们负责构建，同时运行 `tsc --noEmit`；发布类型库时还需 tsc 或专门工具生成 `.d.ts`。

`isolatedModules` 要求每个文件可独立转译，禁止依赖跨文件类型信息才能正确 emit 的写法。`isolatedDeclarations` 对声明生成施加类似约束，要求公开推断更显式，以便工具并行生成声明。

declaration emit 从导出 API 生成 `.d.ts`，可能暴露意外推断出的内部类型。发布前应检查公开声明。source map 把生成 JS 的行列映射回 TS；多段构建必须串联 map，否则线上堆栈会偏移。
