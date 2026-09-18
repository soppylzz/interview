# AGENT.md

Guidance for AI coding agents working in this repository.

## Purpose

A personal knowledge base for interview preparation: knowledge points organized by language / topic. Each point pairs a Chinese Markdown note explaining the theory with small runnable examples demonstrating real behavior, plus LeetCode Hot 100 solutions written in TypeScript.

## Layout

The top level splits into notes / code / practice; new sibling directories may be added as needed.

- `docs/` — Chinese knowledge notes, grouped by topic: `browser/` (event loop, rendering, caching, cross-origin, storage, security; images live in the same directory's `assets/`), `css/`, `network/`. `docs/questions/` records real interview questions by date (e.g. `9.13.md`); `docs/advise.md` collects interview experience and review advice.
- `code/` — runnable example code, grouped by language (`javascript/`, `typescript/`); the Markdown notes explaining these examples live under `docs/`.
- `algorithm/hot100/` — Hot 100 solutions: one subdirectory per problem type (`hash/`, `pointer/`, `biTree/`, `dp/`, `backtrack/`, etc.), one `.ts` file per problem carrying its problem number (e.g. `hash/1.twoSum.ts`). Multiple approaches to one problem share the same file; hard and special variants get separate `.hard.ts` / `.special.ts` files. Shared node definitions live in the type directory (`linked/listNode.ts`, `biTree/treeNode.ts`) and are imported by relative path.
- `algorithm/structure/` — Markdown notes on data structures (e.g. `priorityQueue.md`).
- `algorithm/special/` — Markdown notes on algorithm topics (e.g. `lru.md`, `manacher.md`).
- Review progress is tracked in `algorithm/hot100/REVIEW.md`: solved problem numbers logged by day.
- `README.md` (Chinese) and `README.en.md` (English) are the repository index; keep the two in sync when the layout changes.
- `CLAUDE.md` is a pointer that routes agents to this file; all agent guidance lives here.

## Project Rules

Hard rules for code and docs live in `.claude/rules/` (loaded automatically each session, no manual reference needed):

- `.claude/rules/code-style.md` — comments in English only and as few as possible; prefer self-explanatory naming; `//` for single lines, `/** */` for blocks; use the two-level `====` / `------` dividers only to separate semantic sections.
- `.claude/rules/markdown-docs.md` — Markdown study notes are written in Simplified Chinese; comments inside code snippets stay English.

When the directory layout or run instructions change, update the matching sections here and in `.claude/rules/` in the same commit.

## Running

- Node is pinned to 22 (see `.nvmrc`).
- Run a single JS example: `node code/javascript/<file>.js`
- Run a `.ts` solution: `npx ts-node algorithm/hot100/hash/1.twoSum.ts`
- Lint and format: `npm run lint` / `npm run format` (ESLint + Prettier configured at the repo root).
- VSCode Code Runner is configured (`.vscode/settings.json`): the current `.js` runs `javascript -> node`, the current `.ts` runs `typescript -> npx ts-node`, output in the integrated terminal.
