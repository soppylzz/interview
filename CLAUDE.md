# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库目标

面向面试准备的个人知识笔记库：按「语言 / 主题」整理知识点，每个知识点配一份用 Markdown 写的中文笔记讲解原理，并辅以可直接运行的小段示例代码演示行为。

## 目录约定

- 每个语言 / 主题对应一个顶层目录，当前只有 `javascript/`，可随时新增（如 `network/`、`browser/` 等）。
- 顶层目录下的 `code-output/` 存放可运行的编号示例，编号代表知识点的记录顺序。示例见 `javascript/code-output/1.typeof.js`。
- 说明某个知识点行为的 Markdown 笔记与对应编号的 code-output 示例配套存放。
- `README.md` 作为目录 / 索引使用（当前为空，待建设）。

## 项目规范

代码与文档的硬性规范集中在 `.claude/rules/`（每次会话自动加载，无需手动引用）：

- `.claude/rules/code-style.md` —— 代码注释一律英文且尽量少写，优先用语义化命名自解释；`//` 单行、`/** */` 多行、仅分区时用两级 `====` / `------` 分隔线。
- `.claude/rules/markdown-docs.md` —— Markdown 学习笔记一律中文编写（代码片段内的注释仍为英文）。

## 运行方式

- Node 版本固定为 22（见 `.nvmrc`）。
- 命令行直接运行单个示例：`node javascript/code-output/1.typeof.js`
- VSCode 中已配置 Code Runner：对当前 `.js` 执行 `javascript -> node`，在集成终端输出结果。
