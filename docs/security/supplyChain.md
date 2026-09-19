# 第三方脚本与供应链

供应链风险包括拼写相似包、dependency confusion、维护者账号接管、恶意版本、install script 和构建系统泄密。锁文件固定解析结果，但不能证明依赖安全。

依赖变更应审查来源、维护状态、发布内容、脚本、权限和传递树；CI 使用 frozen lockfile、最小权限 token、受保护发布流程和来源证明。及时更新同时保留回归与撤回能力。

SRI 验证通过 link/script 获取的固定资源内容，适合版本化 CDN；动态加载和频繁更新需维护 hash，且不能限制已受信脚本的行为。

Tag manager、分析 SDK、CDN 和扩展拥有接近一方脚本的权限，应最少化、延迟加载、用 CSP/iframe 隔离并建立 owner 与应急禁用开关。SBOM/SCA 帮助清点，不替代风险判断。
