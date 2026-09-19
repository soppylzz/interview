# URL、跳转与导航安全

Open Redirect 让攻击者借可信域名把用户跳到钓鱼站，也可能泄露 OAuth code/token 或绕过 allowlist。redirect 参数应映射到服务端已知目标，或用 URL parser 解析后精确校验 scheme、host、port。

字符串 startsWith/contains 会被用户名段、编码、大小写、尾点和相似域名绕过。先按标准解析/规范化，再比较结构字段；通常只允许 http/https，拒绝 javascript/data 等主动 scheme。

敏感数据不放 URL，因为可能进入历史、日志、截图和 Referer。回调 URL/OAuth redirect URI 应精确匹配预注册值，不允许宽泛子域和开放跳转链。
