# 声明文件与声明合并

`.d.ts` 只描述类型契约，不提供运行时实现。声明存在但真实 JavaScript 不存在或导出形状不同，代码仍会在运行时失败。

`declare` 表示该值由其他脚本、宿主或构建步骤提供：

```ts
declare const APP_VERSION: string

declare module 'legacy-lib' {
  export function run(input: string): number
}
```

全局库可声明 global variable/function；CJS 常使用 `export =` 配合相应导入方式；ESM 使用正常 export 声明。一个外部模块中的 `declare global {}` 可安全扩展全局类型。

## 扩展与合并

module augmentation 用原模块名补充现有接口，但不能凭空实现运行时成员。interface 可同名合并；namespace 可与 namespace、class、function、enum 按规则合并。非导出成员只对其原 namespace 声明块可见。

TypeScript 默认从可见 `node_modules/@types` 查类型包。`types` 限制自动加入全局范围的包；`typeRoots` 改变搜索目录，误配可能让默认 `@types` 消失。

`skipLibCheck` 跳过 `.d.ts` 内部的一致性检查，可降低迁移/构建成本，但不会修复错误声明，也不会保证使用处安全。优先统一重复依赖版本或修复上游类型。
