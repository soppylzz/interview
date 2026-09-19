# Lint、Format 与类型检查

| 工具 | 主要问题 |
| --- | --- |
| parser/compiler | 语法是否合法 |
| TypeScript | 类型关系和类型驱动的程序错误 |
| ESLint | 可配置的代码模式、缺陷和团队约束 |
| Prettier | 统一代码排版 |

Prettier 应专注格式，业务正确性和危险模式交给 ESLint/类型系统。type-aware lint 使用 TypeScript Program 和类型信息，能发现浮动 Promise、错误调用等问题，但初始化和分析成本更高，可按目录或 CI 阶段启用。

ESLint 中 parser 把源码转成可遍历结构，plugin 提供规则，rule 报告具体模式，config/preset 组合启用策略。flat config 按数组顺序和文件匹配合并配置，排查时应查看目标文件的最终配置。

pre-commit 可通过 lint-staged 快速修复本次修改；CI 必须在干净环境检查全量 lint、format 和 typecheck，避免本地 hook 被跳过。自动修复改变代码后仍需验证，因为“能修”不代表保持业务语义。
