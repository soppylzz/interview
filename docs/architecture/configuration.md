# 配置与环境

Build-time config 在编译时进入产物，修改需重建；runtime config 在启动/部署时加载，支持 build once deploy many。进入浏览器的任何配置都不能包含秘密。

按默认值、环境文件、部署注入、远程配置建立明确优先级，并在应用启动时用 schema 一次性解析校验；失败应阻止错误配置悄悄运行。

配置结构有版本和迁移策略。多租户/白标把品牌 token、能力和 endpoint 分层，避免复制整套应用。

Feature flag 要有 owner、目标人群、默认值、故障 fallback 和删除日期。远程配置不可执行任意代码，缓存最后已知安全值并限制变更权限。
