# AGENT.md

Guidance for AI coding agents working in this repository.

## Purpose

A personal knowledge base for interview preparation: knowledge points organized by language / topic. Each point pairs a Chinese Markdown note explaining the theory with small runnable examples demonstrating real behavior, plus LeetCode Hot 100 solutions written in TypeScript.

## Layout

The top level splits into notes and practice; new sibling directories may be added as needed.

- `docs/` — Chinese knowledge notes, grouped by topic: `architecture/`, `auth/`, `browser/` (subdirectories `api/`, `cache/`, `core/`, `pwa/`, `storage/` plus loose topic notes; diagram images live in the same subdirectory's `assets/`), `css/`, `engineering/`, `html/`, `javascript/`, `monitoring/`, `network/`, `node/`, `perf/`, `security/`, and `typescript/`.
- `docs/browser/storage/` — client storage topics, one subdirectory per topic (`cookie/`, `webStorage/`, `indexedDB/`, `storageManagement/`), each pairing a `README.md` note with a self-contained, zero-dependency Node demo (`index.ts`, run via `node docs/browser/storage/<topic>/index.ts`, experienced in a real browser): cookie — two servers (`:3000` victim bank on `localhost`, `:3001` attacker on `127.0.0.1`, a cross-site pair) reproducing Secure/HttpOnly/SameSite attack-and-defense; webStorage — one lab page (`:4000`) for the localStorage vs sessionStorage differences (reload persistence, per-tab isolation, cross-tab `storage` events, quota error); indexedDB — one lab page (`:5002`, port 5000 is taken by macOS AirPlay) for transactions, index/cursor reads, structured clone, and schema upgrades; storageManagement — one lab page (`:5001`) for `estimate()`, `persist()`, OPFS, and quota-error recovery.
- `docs/browser/cache/` — HTTP cache and BFCache topic notes (`httpCache.md`, `bfcache.md`) plus one shared lab (`index.ts`, run via `node docs/browser/cache/index.ts`, port `:5003`): a policy lab at `/` serving five assets with distinct `Cache-Control`/validator setups (server-side versions are bumpable to trigger 304-vs-200 flips, with a `fetch` `cache`-mode probe) and a BFCache page at `/bfcache` (helper page `/between`, `?unload=1` blocker toggle, `pageshow.persisted` and `notRestoredReasons` reporting).
- `docs/browser/core/` — event loop and rendering notes (`rendering.md`, `scheduling.md` plus `eventLoop/`) with diagram `assets/`; `eventLoop/` pairs the event-loop note with a deterministic virtual-clock simulator (`eventLoopSimulator.ts`, run via `node docs/browser/core/eventLoop/eventLoopSimulator.ts`, pure Node, no browser) that walks tasks, microtasks, rendering updates and idle periods on one timeline, plus an annotated walkthrough (`eventLoopSimulator.md`).
- `questions/` — real interview questions recorded by date (e.g. `9.13.md`).
- `handwrite/type-challenges/` — TypeScript type-challenges practice grouped by difficulty, with unresolved items tracked in `UNRESOLVED.md`.
- `algorithm/hot100/` — Hot 100 solutions: one subdirectory per problem type (`hash/`, `pointer/`, `biTree/`, `dp/`, `backtrack/`, etc.), one `.ts` file per problem carrying its problem number (e.g. `hash/1.twoSum.ts`). Multiple approaches to one problem share the same file; hard and special variants get separate `.hard.ts` / `.special.ts` files. Shared node definitions live in the type directory (`linked/listNode.ts`, `biTree/treeNode.ts`) and are imported by extensionless relative path (bundler-style resolution per the root `tsconfig.json`; such files are type-check only — native `node` runs need explicit extensions). A solution file whose top-level name would clash with another script-scope file ends with `export {}` to become a module.
- `algorithm/structure/` — data structures: one subdirectory per structure, holding `README.md` (Simplified Chinese note: definition, representation, core operations, use cases) plus a self-contained `index.ts` implementation runnable via `node algorithm/structure/<name>/index.ts` (e.g. `heap/`). Every `index.ts` ends with `export {}` so its top-level names stay file-scoped instead of clashing across the script-scope program.
- `algorithm/special/` — algorithm topics: same subdirectory layout as `algorithm/structure/` (a `README.md` note plus a self-contained runnable `index.ts`). The README details every solution method for the topic in turn (e.g. LIS covers both DP and patience sorting).
- Review progress is tracked in `algorithm/hot100/REVIEW.md`: solved problem numbers logged by day.
- `README.md` (English) is the repository index; it stays lean, with agent-facing detail living here.
- `CLAUDE.md` is a pointer that routes agents to this file; all agent guidance lives here.

## Project Rules

Hard rules for code and docs live in `.claude/rules/` (loaded automatically each session, no manual reference needed):

- `.claude/rules/code-style.md` — comments in English only and as few as possible; prefer self-explanatory naming; `//` for single lines, `/** */` for blocks; use the two-level `====` / `------` dividers only to separate semantic sections.
- `.claude/rules/markdown-docs.md` — Markdown study notes are written in Simplified Chinese; comments inside code snippets stay English.
- `.claude/rules/excalidraw-diagrams.md` — editable Excalidraw PNG workflow, typography, semantic colors, layout, connectors, backups, and validation rules for repository diagrams.

When the directory layout or run instructions change, update the matching sections here and in `.claude/rules/` in the same commit.

## Running

- Node is pinned to 22 (see `.nvmrc`; >= 22.18 runs `.ts` files natively).
- Run a `.ts` solution: `node algorithm/hot100/hash/1.twoSum.ts`
- Type-check `algorithm/` (strict, root `tsconfig.json`): `npx tsc`
- Lint and format: `npm run lint` / `npm run format` (ESLint + Prettier configured at the repo root).
- VSCode Code Runner is configured (`.vscode/settings.json`): the current `.js` runs `javascript -> node`, the current `.ts` runs `typescript -> node`, output in the integrated terminal.
