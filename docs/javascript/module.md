# JavaScript Module

ESM 的 import/export 是静态语法，模块默认严格模式，每个模块只求值一次。导入是只读 live binding：导出方更新后，导入方观察到新值，但不能给导入 binding 赋值。

named export 明确导出多个名称；default 每模块最多一个，导入方可自行命名。动态 `import()` 返回 Promise，适合条件加载和分块。top-level await 会让依赖当前模块的执行异步等待。

循环依赖先实例化模块图、建立 binding，再按依赖顺序求值；在初始化前读取 let/const/class 导出可能进入 TDZ。减少顶层副作用和相互读取可降低风险。

classic script 共享全局，ESM 有 module scope。CommonJS 是运行时 require/exports 和值对象模型，互操作细节由 Node/bundler决定，不能假设 default/named 自动完全对应。
