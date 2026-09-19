# Node.js 原生 TypeScript 支持

现代 Node 可以直接擦除一部分可删除的 TypeScript 类型语法并执行 `.ts`。这叫 type stripping，不等同于 TypeScript compiler：Node 不执行类型检查，也不会读取 tsconfig 来完成整套降级和路径转换。

## 能力边界

接口、类型标注等只需删除的语法最适合直接执行。enum、参数属性、namespace 等需要生成 JavaScript 的语法，其支持方式和开关依 Node 版本而异；JSX、decorator、paths alias 和目标语法降级也不能想当然地交给 stripping。

模块格式仍由文件扩展名、最近 package.json 的 `type` 和 Node ESM 规则决定。直接执行源码时应使用运行时可解析的 import specifier 和扩展名。

tsconfig 的 `paths`、`target`、`downlevelIteration` 等不会自动改变 Node 的运行行为。项目仍应运行 `tsc --noEmit` 做类型检查。

需要旧 Node、JSX、完整语法转换、bundle、alias 或发布 `.js/.d.ts` 时，仍应使用 tsc、tsx、SWC 或 bundler。原生 TS 能力变化较快，文档必须绑定项目的 Node 版本验证，不能把最新版本行为写成所有版本保证。
