# Interview Notes

A personal knowledge base for interview preparation: knowledge points organized by language / topic, each pairing a Chinese Markdown note on the theory with small runnable code samples, plus LeetCode Hot 100 solutions in TypeScript.

[简体中文](./README.md) | English

## Layout

```text
.
├── docs/                # Chinese knowledge notes
│   ├── browser/         # Browser: event loop, rendering, caching, cross-origin, storage, security
│   ├── css/             # CSS: BFC, containing blocks, stacking contexts
│   ├── network/         # Networking: base / pro
│   ├── questions/       # Real interview questions logged by date (e.g. 9.13.md)
│   └── advise.md        # Interview experience and review advice
├── code/                # Runnable example code (javascript / typescript, work in progress)
└── algorithm/
    ├── hot100/          # Hot 100 solutions (TypeScript, one directory per problem type)
    ├── structure/       # Data-structure notes (heap, segment tree, union-find, skip list, ...)
    └── special/         # Algorithm-topic notes (LCS, LIS, LRU, Manacher, ...)
```

### algorithm/hot100

One `.ts` file per problem, named with its problem number (e.g. `hash/1.twoSum.ts`). Multiple approaches to one problem share the same file; hard and special variants get separate `.hard.ts` / `.special.ts` files. Grouped by problem type:

| Group | Directories |
| --- | --- |
| Array · Hash · Matrix | `array/` `hash/` `matrix/` |
| Two pointers · Sliding window · Substring | `pointer/` `window/` `subString/` |
| Stack · Heap · Binary search | `stack/` `heap/` `biSearch/` |
| Linked list · Binary tree | `linked/` `biTree/` (shared node definitions in `listNode.ts` / `treeNode.ts`) |
| Graph · Backtracking · Greedy · DP · Misc | `graph/` `backtrack/` `greedy/` `dp/` `dpPro/` `misc/` |

Review progress is logged by day in `algorithm/hot100/REVIEW.md`.

## Running

- Node is pinned to 22 (see `.nvmrc`).
- Run a `.ts` solution: `npx ts-node algorithm/hot100/hash/1.twoSum.ts`
- Run a JS example: `node code/javascript/<file>.js`
- Lint and format: `npm run lint` / `npm run format`

## Conventions

- Study notes are written in Simplified Chinese; code comments are English and kept to a minimum (see [.claude/rules/](./.claude/rules/)).
- For AI agents, guidance lives in [AGENT.md](./AGENT.md) (`CLAUDE.md` only routes to it).
