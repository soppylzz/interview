# Event Loop

> W3C -> `event loop`
>
> Chromium -> `base/message_loop`

## 1. Process & Thread

1. 一个进程在启动时自动创建线程来运行代码，这个线程为主线程（与进程生命周期相同）
2. 浏览器是一个**多进程**、多线程的应用程序
   > 为了避免相互影响，减少连环崩溃的几率，启动浏览器后，它会自动启动多个进程

## 2. Browser Process

> 标签页渲染进程 + 浏览器进程

- 浏览器进程：浏览器交互页面展示、**用户交互**、子进程管理等
- 网络进程：辅助加载网络资源，内部会启动多个线程来处理不同网络任务
- **渲染进程**：
  > 开启**渲染主线程**，负责执行 HTML、CSS、JS
  > 默认情况下，浏览器会为每个标签页开启一个新的渲染进程，保证标签页间互不影响
  >
  > 进程创建：process-per-tab / process-per-site

## 3. Render Thread

> 最繁忙的线程，JS 单线程的原因

主要任务包括但不限于：

- 解析 HTML、CSS
- 计算样式 (样式冲突、100%、rem、em计算等)、布局
- 处理图层 (z-index)
- 60 frame per second (render)
- **执行 JS**
- 执行事件处理函数
- 执行计时器回调函数

> 为什么渲染进程不使用多个线程来处理这些事件？

如何调度任务：

- 执行 JS 过程中，触发按键事件 / 计时器事件 —— 如何执行这些回调函数？
- 如何处理点击事件与计时器事件同时触发？

浏览器的解决方案是：**排队** (事件 /。消息队列)

1. 最开始进入 `for(;;)`
2. 每次循环检查消息队列是否有任务存在：1. 存在取出任务执行，执行完后进入下一次循环；2. 没有则进入休眠状态
3. 其他线程可以随时向消息队列添加任务。添加新任务是，如果主线程处于休眠状态，则会唤醒并继续执行循环拿取任务

## 4. Async

代码在执行过程中，会遇到一些无法立即处理的任务：

- 计时器回调：`setTimeout`、`setInterval`
- 网路响应回调：`fetch`、`XHR`
- 事件回调：`addEventListener`

采用同步处理会阻塞主线程，而**渲染线程承担极其重要的工作，无论如何都不能阻塞**，因此采用异步来解决上述问题：

- 计时器：`setTimeout` -> 计时线程 -> 计时结束后，将回掉函数放置消息队列末尾（回掉函数包装为任务）

```js
var h1 = document.querySelector("h1")
var btn = document.querySelector("btn")

function delay(duration) {
  const start = performance.now()
  while (performance.now() - start < duration) {}
}

btn.onClick = function () {
  // repaint: add repaint task into message queue
  h1.textContent = "changed"

  // this statement will block the modification of h1
  delay(3000)
}
```

## 5. Priority

消息队列内的任务没有优先级，但**消息队列有优先级**

> origin：宏任务、微任务

现有解释（2024）：

- 每个任务都有一个任务类型，同一个类型的任务必须在一个队列中，不同类型的任务可以分属于不同的队列。一次事件循环中，浏览器可以根据实际的情况从不同对立中取任务执行

- 浏览器必须准备一个微队列<sup>VIP</sup>，微队列的任务优先级**优先于**所有其他任务执行

chromium 的队列：

- 延时队列<sup>(中)</sup>：计时器回调任务
- 交互队列<sup>(高)</sup>：用户操作任务
- **微队列**<sup>(最高)</sup>：用户存放需要最快执行的任务

添加微队列的方式有：

- `Promise.resolve()`
- `MutationObserver`

## 6. Interview

### 事件循环原理

### JS 计时器能做到精准计时吗

1. 操作系统的计时函数本身存在少量偏差

2. `setTimeout` 嵌套超过 5 层，就会有 4ms 误差

   ```cpp
   constexpr int kMaxTimerNestingLevel = 5
   ```

3. 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此带来了偏差
