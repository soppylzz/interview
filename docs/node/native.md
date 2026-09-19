# 原生扩展与 WASM

Node-API 提供相对稳定的 C ABI，使 addon 尽量不直接依赖变化频繁的 V8 ABI。它降低跨 Node 版本维护成本，但原生二进制仍与操作系统、CPU 架构和 libc 等平台条件相关。

node-gyp 根据 binding 配置和本机构建链编译 addon。为避免用户安装时编译，包可发布各平台 prebuild，再在安装脚本中选择匹配产物并在必要时回退构建。安装脚本本身也增加供应链和环境风险。

## 方案选择

- Worker Thread：复用 JavaScript 实现，适合把 CPU 工作移出主线程。
- WASM：沙箱化、跨平台字节码较强，适合计算核心，但 JS/内存边界有成本。
- native addon：能调用系统库并获得最高控制，发布、内存安全和崩溃成本最高。

原生段错误可能终止整个 Node 进程，无法像普通异常一样可靠 catch。高风险计算可进一步放到子进程隔离。

跨平台发布至少覆盖 OS、x64/arm64、glibc/musl、Node-API 版本及签名/下载策略，并为没有 prebuild 的环境给出明确失败信息或纯 JS/WASM 回退。
