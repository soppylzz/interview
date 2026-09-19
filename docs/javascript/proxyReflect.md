# Proxy 与 Reflect

Proxy 拦截对象的 get、set、has、ownKeys、construct 等内部操作。Reflect 提供与内部操作对应的默认实现，适合在 trap 中转发并保留 receiver 语义。

```js
const proxy = new Proxy(target, {
  get(target, key, receiver) {
    track(target, key)
    return Reflect.get(target, key, receiver)
  },
})
```

receiver 决定原型 accessor 中 this 的值。直接 `target[key]` 可能让 getter 绕过代理接收者。

Proxy 必须遵守 invariant，例如不可配置属性不能在 ownKeys 中被隐藏。它创建新身份，严格相等与 WeakMap key 会不同；内建 private field 依赖真实 receiver，简单代理可能失败。响应式和校验是常见用途，但热路径应测量开销。
