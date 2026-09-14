# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库目标

面向面试准备的个人知识笔记库：按「语言 / 主题」整理知识点，每个知识点配一份用 Markdown 写的中文笔记讲解原理，并辅以可直接运行的小段示例代码演示行为。

## 目录约定

- 顶层按「笔记 / 代码 / 刷题」分成三类，可随时新增同级目录：`docs/`（中文知识笔记）、`code/`（可运行示例代码）、`algorithm/`（算法刷题）。
- `docs/` 按主题分子目录存放知识笔记：`browser/`（事件循环、渲染、缓存、跨域、存储、安全，配图放同目录 `assets/`）、`css/`、`network/`；`docs/questions/` 按日期记录面试真题（如 `9.13.md`），`docs/advise.md` 记录面试经验与复习建议。
- `code/` 存放可直接运行的示例代码，按语言分子目录（`javascript/`、`typescript/`），讲解对应示例的 Markdown 笔记写在 `docs/` 下。
- `algorithm/hot100/` 存放 Hot 100 题解：按题型分子目录（如 `hash/`、`pointer/`、`biTree/`、`dp/`、`backtrack/`），每题一个带题号的 `.ts` 文件（如 `hash/1.twoSum.ts`）；一个题型多种解法或多个变体写在同一个文件里。链表、二叉树的公共节点定义放在对应目录下的 `listNode.ts` / `treeNode.ts`，题解用相对路径 `import` 引入。
- `algorithm/structure/` 存放数据结构的 Markdown 笔记（如 `priorityQueue.md`）。
- `algorithm/special/` 存放算法专题的 Markdown 笔记（如 `lru.md`、`manacher.md`）。
- 复习进度记录在 `algorithm/hot100/REVIEW.md`：按天登记已过题的题号。
- `README.md` 作为目录 / 索引使用（当前为空，待建设）。

## 项目规范

代码与文档的硬性规范集中在 `.claude/rules/`（每次会话自动加载，无需手动引用）：

- `.claude/rules/code-style.md` —— 代码注释一律英文且尽量少写，优先用语义化命名自解释；`//` 单行、`/** */` 多行、仅分区时用两级 `====` / `------` 分隔线。
- `.claude/rules/markdown-docs.md` —— Markdown 学习笔记一律中文编写（代码片段内的注释仍为英文）。
- 目录结构、运行方式发生变化时，同一次提交里同步更新本文件的对应小节，以及 `.claude/rules/` 中引用了旧路径的说明。

## 运行方式

- Node 版本固定为 22（见 `.nvmrc`）。
- 直接运行单个 JS 示例：`node code/javascript/<示例文件>.js`
- 运行 `.ts` 题解：`npx ts-node algorithm/hot100/hash/1.twoSum.ts`
- VSCode 中已配置 Code Runner：对当前 `.js` 执行 `javascript -> node`、对 `.ts` 执行 `typescript -> npx ts-node`，在集成终端输出结果。
