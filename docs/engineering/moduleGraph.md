# JavaScript 模块与模块图

模块图以 entry 为起点。每个模块是节点，静态 import、动态 import 和资源引用形成边；importer 表示引用当前模块的上游节点。

## 为什么 ESM 易于分析

ESM 的 `import/export` 位于静态语法结构中，构建器无需执行代码就能枚举大部分依赖和导出。CommonJS 的 `require(expr)` 可以出现在分支中并使用动态参数，因此通常需要保守处理。

动态 `import()` 既是依赖边，也是潜在分块点。循环依赖中，ESM 导入是 live binding，过早读取可能落入暂时性死区；CommonJS 常观察到尚未执行完的 `exports` 对象。

## 解析入口

- `./x`、`../x` 相对 importer 解析；绝对 URL 可直接交给浏览器。
- `react` 这类 bare import 需要包解析或开发服务器改写。
- `exports` 是现代包的公开入口和条件映射；`imports` 声明包内 `#` 别名。
- `main` 是传统 CommonJS 入口，`module`、`browser` 是工具生态约定，不等同于标准条件导出。

conditional exports 可按 `import`、`require`、`browser`、`node` 等条件选入口。条件顺序和工具支持都会影响结果。

## 工程决策

应用通常把依赖打进产物以便部署；库常把 peer dependency external，避免重复实例并把版本选择交给消费方。alias 必须同步给 bundler、TypeScript、测试工具和运行时，否则会出现编辑器正常而构建或测试失败。

排查解析问题时记录 importer、请求字符串、命中的条件、最终文件及是否 external，比反复修改后缀有效。
