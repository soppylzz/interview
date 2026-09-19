# npm 包与 SemVer

## 依赖类型

| 字段 | 含义 |
| --- | --- |
| dependencies | 包在运行或被消费时需要 |
| devDependencies | 本仓库开发、测试和构建需要 |
| peerDependencies | 要求消费方提供兼容实例 |
| optionalDependencies | 安装失败仍允许继续的可选能力 |

SemVer 的 major 表示不兼容变更，minor 表示向后兼容功能，patch 表示向后兼容修复。`^1.2.3` 通常允许 `<2.0.0`，`~1.2.3` 通常允许 `<1.3.0`，精确版本只匹配一个版本；`0.x` 和 prerelease 的范围规则更保守，不能只靠直觉推断。

## 清单与锁文件

`package.json` 声明可接受范围和包元数据；lockfile 固定本次解析出的完整依赖图、完整性信息和下载来源。应用和工具仓库通常都应提交 lockfile，并在 CI 使用 frozen/clean install。

npm script 会临时把 `node_modules/.bin` 加入 PATH。生命周期脚本可以编译原生依赖，也构成供应链执行入口；应审查来源、限制权限并在适用场景禁用脚本。

发布前用 `files` 白名单、`.npmignore` 和 `publishConfig` 控制内容，再以 `npm pack --dry-run` 检查真实 tarball。不要假设 git 忽略规则等同于 npm 发布规则。
