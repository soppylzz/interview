# Browser Event Loop

事件循环是 HTML Standard 定义的调度模型；Chromium 的进程、线程和内部队列是其中一种实现，不应当作所有浏览器的规范结构。

## 1. 进程与线程

进程拥有相对独立的地址空间和系统资源，线程共享所属进程的内存。多进程能提高故障隔离、安全隔离和并行能力，代价是更多内存及 IPC 开销。

Chromium 常见进程包括：

| 进程 | 主要职责 |
| --- | --- |
| Browser Process | 浏览器 UI、导航协调、权限、输入路由和子进程管理 |
| Network Service | DNS、连接、HTTP、缓存等网络工作 |
| Renderer Process | 解析页面、执行页面脚本、样式布局和绘制 |
| GPU/Viz Process | 光栅化、跨页面合成及向系统提交画面 |

Chrome 会依据 Site Isolation、站点关系、iframe 和资源限制分配 Renderer Process。一个标签页可能涉及多个渲染进程，多个同站页面也可能复用进程，因此不能概括为“一标签页一个进程”。

## 2. 渲染主线程

一个 Renderer Process 通常只有一条渲染主线程，负责页面 JavaScript、DOM 事件、HTML/CSS 解析，以及大量样式、布局和绘制工作。Web Worker 可在其他线程执行脚本，但不能直接操作当前页面 DOM。

JavaScript 与 DOM 更新集中在同一主线程，使脚本执行与页面结构修改保持确定顺序。代价是长时间脚本会同时延迟输入处理、计时器和渲染。

浏览器并非“无论如何都不能阻塞”：同步循环、布局计算和事件回调都可能阻塞主线程。异步 API 只把等待或部分工作交给宿主，回调最终在主线程执行时仍可能形成 Long Task。

## 3. Task 与 Microtask

HTML 事件循环维护多个 task queue。计时器、用户交互、网络事件等任务来自不同 task source；浏览器按规范约束和自身调度策略选择可运行任务。代码不能依赖某类普通 task 永远优先于另一类。

一次简化的循环过程：

1. 选择并执行一个 task，直到调用栈清空。
2. 执行 microtask checkpoint，持续清空 microtask queue。
3. 到达合适时机时执行渲染更新，包括 `requestAnimationFrame` 回调、样式、布局与绘制。
4. 继续选择下一个 task，或在没有工作时等待。

常见 microtask 来源：

- `Promise.then/catch/finally`
- `queueMicrotask()`
- `MutationObserver` 通知

`Promise.resolve()` 只创建已兑现 Promise，不会单独排入回调；需要调用 `.then()`。

```js
console.log('sync')

setTimeout(() => console.log('timer'), 0)
queueMicrotask(() => console.log('microtask'))
Promise.resolve().then(() => console.log('promise'))

// sync -> microtask -> promise -> timer
```

每个 microtask 还可以继续添加 microtask，因此递归调度可能让浏览器迟迟无法进入渲染和下一个 task，形成 microtask starvation。

## 4. 异步任务如何返回

计时器到期、网络数据可用或输入发生后，宿主会把相应任务变为可运行状态。主线程必须先完成当前 task 和随后的 microtask checkpoint，才可能执行它。

```js
const heading = document.querySelector('h1')
const button = document.querySelector('button')

function block(duration) {
  const start = performance.now()
  while (performance.now() - start < duration) {}
}

button.addEventListener('click', () => {
  heading.textContent = 'changed'
  block(3000)
})
```

DOM 已经修改，但浏览器通常要等当前 callback 和 microtask 执行完，获得渲染机会后才把新内容呈现在屏幕上，所以用户会在约 3 秒后看到变化。

## 5. 渲染时机

渲染不是每轮事件循环必然发生，也不保证固定 60 FPS。浏览器会结合显示器刷新率、页面可见性、是否需要更新及性能情况选择渲染机会。

微任务通常发生在当前 task 之后、渲染机会之前。`requestAnimationFrame` 用于在下一次预计绘制前更新视觉状态；它不是 microtask，也不等价于 `setTimeout(fn, 16)`。

## 6. setTimeout 为什么不精确

`setTimeout(fn, delay)` 表示经过至少 delay 后，回调才有资格排队，不承诺该时刻立即执行。偏差来自：

1. 当前 task、microtask 或其他任务占用主线程。
2. 嵌套计时器达到规范规定的 nesting level 后，小于 4ms 的延迟会被钳制到至少 4ms。
3. 后台页面的计时器会被节流，浏览器还可能批处理任务。
4. 操作系统调度、设备负载和省电策略带来额外延迟。

因此动画使用 `requestAnimationFrame`，精确耗时使用 `performance.now()` 计算实际时间；倒计时应根据目标时间校正，而不是假设每次 interval 都准时。

## 7. 面试回答框架

回答执行顺序题时依次写出：同步调用栈、当前 task 产生的 microtask、microtask checkpoint、可能的渲染机会、后续 task。若涉及 `requestAnimationFrame`、后台节流或不同 task source，应说明规范允许调度差异，不给出超出保证范围的唯一顺序。
