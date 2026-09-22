# 客户端存储实验

每个子目录一个主题：`cookie/`、`webStorage/`、`indexedDB/`、`storageManagement/`，各自包含一篇 `README.md` 笔记和一个自包含、零依赖的 Node 演示（`index.ts`，Node >= 22 原生运行 `.ts`）。实验页建议配合真实浏览器体验。

## 运行方式

| 主题 | 命令 | 端口 | 内容 |
| --- | --- | --- | --- |
| cookie | `node docs/browser/storage/cookie/index.ts` | `:3000` / `:3001` | 双服务：`localhost:3000` 受害银行站点与 `127.0.0.1:3001` 跨站攻击站点，复现 Secure/HttpOnly/SameSite 攻与防 |
| webStorage | `node docs/browser/storage/webStorage/index.ts` | `:4000` | localStorage 与 sessionStorage 差异：刷新持久化、标签页隔离、跨标签 `storage` 事件、配额报错 |
| indexedDB | `node docs/browser/storage/indexedDB/index.ts` | `:5002` | 事务、索引与游标读取、structured clone、schema 升级（5000 被 macOS AirPlay 占用） |
| storageManagement | `node docs/browser/storage/storageManagement/index.ts` | `:5001` | `estimate()`、`persist()`、OPFS、配额超限恢复 |
