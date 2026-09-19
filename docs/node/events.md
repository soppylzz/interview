# EventEmitter

EventEmitter 是进程内发布订阅实现。`emit` 会按注册顺序同步调用监听器；监听器中的重 CPU 或异常会直接影响当前调用栈，它本身不提供异步调度。

`on` 持续订阅，`once` 首次触发后移除，`off` 需要同一个函数引用，`emit` 返回是否存在监听器。一次 emit 通常基于当时的监听器集合执行；不要依赖回调中增删监听器的边缘顺序来表达业务逻辑。

`error` 是特殊事件：没有监听器时 emit error 会抛出并可能终止进程。资源型 emitter 应始终建立明确错误路径。

MaxListenersExceededWarning 表示同一事件监听器数量超过默认警戒值，常提示忘记清理，但也可能是合法扇出。先检查生命周期，再决定是否调整阈值。可用 AbortSignal 或集中 dispose 在请求/组件结束时解除监听。

EventEmitter 适合多次、可能多订阅者的离散通知；Promise 适合一次完成值；Stream 适合有顺序、错误、结束与背压的数据序列。
