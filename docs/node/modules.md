# CommonJS 与 ES Module

CommonJS 文件会被包装进包含 `exports`、`require`、`module`、`__filename`、`__dirname` 的函数。`exports` 初始指向 `module.exports`；给 `exports` 重新赋值只改变局部引用，最终导出仍以 `module.exports` 为准。

模块首次成功加载后按解析后的文件身份缓存。循环依赖会拿到对方尚未执行完的 exports，因此应避免在初始化阶段依赖完整值。

## ESM

ESM import/export 具有静态结构，导入是 live binding，模块图的实例化与执行分离，并支持 top-level await。TLA 会让依赖它的模块异步等待，过长链路会扩大启动延迟。

`.mjs` 明确为 ESM，`.cjs` 明确为 CJS；`.js` 通常由最近 package.json 的 `type` 决定。ESM 中可使用 `import.meta.url`，现代版本还提供 `import.meta.dirname/filename`；跨版本代码可用 `fileURLToPath` 转换。

静态 import 在模块加载阶段绑定，动态 `import()` 返回 Promise 且两种模块中都可用。CJS/ESM 互操作的 named export 常来自启发式分析，不应假设所有 `module.exports` 都能稳定映射；库应测试 default 和 named 两种消费方式。
