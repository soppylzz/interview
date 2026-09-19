# DOM 事件机制

事件路径从 Window/Document 到目标祖先，再回到上层。监听器按捕获、目标、冒泡阶段执行；目标阶段会调用目标上的相应监听器。

- `event.target` 是事件最初命中的目标，Shadow DOM 下可能经过 retargeting。
- `event.currentTarget` 是当前正在执行监听器的节点，只在回调执行期间有意义。

## 控制传播与默认行为

`stopPropagation()` 阻止事件继续沿路径传播，不阻止同一节点的其他监听器；`stopImmediatePropagation()` 还阻止当前节点后续监听器。`preventDefault()` 取消可取消的默认行为，不停止传播；先检查 `event.cancelable`。

```js
list.addEventListener('click', event => {
  const button = event.target.closest('button[data-id]')
  if (!button || !list.contains(button)) return
  select(button.dataset.id)
})
```

事件委托利用冒泡，适合动态列表和大量同类子项。不可冒泡事件、需要捕获精确生命周期、跨 Shadow 边界或高频热点场景要单独评估。`focus/blur` 不冒泡，可用 `focusin/focusout` 或捕获；`mouseenter/leave` 不冒泡，可按需用 `mouseover/out` 加 relatedTarget 判断。

`addEventListener` 的 `capture` 选择捕获阶段，`once` 首次调用后移除，`passive` 承诺不 preventDefault 以便浏览器优化滚动，`signal` 在 abort 时移除监听器。

浏览器派发的可信输入事件 `isTrusted` 为 true；脚本 `dispatchEvent` 创建的是非可信事件，且同步调用监听器。框架 synthetic event 是框架抽象，不改变底层默认行为与安全限制。
