# Interview Notes

面向面试准备的个人知识库：按「语言 / 主题」整理知识点，每个知识点配一份中文 Markdown 笔记讲解原理，辅以可运行的小段示例代码；另附 LeetCode Hot 100 题解（TypeScript）。

[English](./README.en.md)

## 目录结构

```text
.
├── docs/                # 中文知识笔记
│   ├── browser/         # 浏览器：事件循环、渲染、缓存、跨域、存储、安全
│   ├── css/             # CSS：BFC、包含块、层叠上下文
│   ├── network/         # 计算机网络：base / pro
│   ├── questions/       # 按日期记录的面试真题（如 9.13.md）
│   └── advise.md        # 面试经验与复习建议
├── code/                # 可运行示例代码（javascript / typescript，建设中）
└── algorithm/
    ├── hot100/          # Hot 100 题解（TypeScript，按题型分目录）
    ├── structure/       # 数据结构笔记（堆、线段树、并查集、跳表……）
    └── special/         # 算法专题笔记（LCS、LIS、LRU、Manacher……）
```

### algorithm/hot100

每题一个带题号的 `.ts` 文件（如 `hash/1.twoSum.ts`），同一题的多种解法写在同一个文件里，困难 / 专题变体以 `.hard.ts` / `.special.ts` 后缀独立成文件。按题型分目录：

| 分组 | 子目录 |
| --- | --- |
| 数组 · 哈希 · 矩阵 | `array/` `hash/` `matrix/` |
| 双指针 · 滑动窗口 · 子串 | `pointer/` `window/` `subString/` |
| 栈 · 堆 · 二分 | `stack/` `heap/` `biSearch/` |
| 链表 · 二叉树 | `linked/` `biTree/`（公共节点定义在同目录 `listNode.ts` / `treeNode.ts`） |
| 图 · 回溯 · 贪心 · 动态规划 · 杂项 | `graph/` `backtrack/` `greedy/` `dp/` `dpPro/` `misc/` |

复习进度在 `algorithm/hot100/REVIEW.md` 按天登记已过题的题号。

## 运行方式

- Node 版本固定为 22（见 `.nvmrc`）。
- 运行 `.ts` 题解：`npx ts-node algorithm/hot100/hash/1.twoSum.ts`
- 运行 JS 示例：`node code/javascript/<示例文件>.js`
- 代码检查 / 格式化：`npm run lint` / `npm run format`

## 约定

- Markdown 学习笔记一律中文编写，代码注释一律英文且尽量少写（见 [.claude/rules/](./.claude/rules/)）。
- AI 代理指南见 [AGENT.md](./AGENT.md)（`CLAUDE.md` 仅作跳转）。
