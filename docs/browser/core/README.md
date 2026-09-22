# 渲染与事件循环

主题笔记：`rendering.md`（渲染流水线）与 `scheduling.md`（调度），图示在同目录 `assets/`；`eventLoop/` 子目录包含事件循环笔记与一个可运行的模拟器。

## Event Loop 模拟器

`eventLoop/eventLoopSimulator.ts` 用虚拟时钟按 HTML 规范的处理模型串起 task、microtask checkpoint、渲染更新与空闲期，时间线完全确定，纯 Node 模拟、不需要浏览器：

```bash
node docs/browser/core/eventLoop/eventLoopSimulator.ts
```

理论见 `eventLoop/eventLoop.md`，逐段注解的走查见 `eventLoop/eventLoopSimulator.md`。
