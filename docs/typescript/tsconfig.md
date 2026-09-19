# tsconfig 与严格模式

`files` 精确列出输入；`include` 按 glob 纳入；`exclude` 主要过滤 include 搜索结果，不会阻止一个文件因 import 被拉入程序。先用 `tsc --showConfig` 和 `--listFiles` 确认最终配置与输入。

## 严格检查

`strict` 是一组严格选项的总开关，具体成员会随 TypeScript 版本演进。面试常见项：

- `noImplicitAny`：无法推断时不允许静默 any。
- `strictNullChecks`：null/undefined 独立建模。
- `strictFunctionTypes`：更严格检查函数参数 variance。
- `useUnknownInCatchVariables`：catch 变量从 any 改为 unknown。
- `noUncheckedIndexedAccess`：未保证存在的索引结果加入 undefined。
- `exactOptionalPropertyTypes`：区分缺失属性与显式 undefined。

## 输出与环境

`noEmit` 只检查；`declaration` 输出 `.d.ts`；`sourceMap` 生成源码映射；`incremental` 保存构建信息以复用检查结果。`lib` 声明目标环境的标准 API 类型，不注入任何 polyfill；`types` 控制自动加入的环境/包全局声明。

`extends` 复用基础配置。大型仓库用 project references 划分依赖图，引用目标通常启用 `composite`，以声明文件和构建信息支持增量构建。配置应按“运行环境 + 构建工具 + 类型检查目标”设计，而不是复制一份通用模板。
