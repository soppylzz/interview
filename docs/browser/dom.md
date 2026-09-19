# DOM 与 CSSOM

DOM 把文档表示为 Node 树；Element 是 Node 的子类型，attribute 是元素标记信息，不等同于普通子节点。CSSOM 表示样式表和规则，两者共同参与样式与布局。

`getElementById` 针对 id，`querySelector/All` 使用 CSS selector。`querySelectorAll` 返回 static NodeList；`getElementsByClassName/TagName` 等常返回 live HTMLCollection，DOM 改变后集合自动更新，遍历时修改 DOM 需谨慎。

attribute 是 HTML 中的初始/序列化值，property 是 DOM 对象当前状态。二者常会反射，但不总同步，例如 input 的 `value` property 可随用户输入改变，而 value attribute 表示默认值。

## 内容 API

- `textContent` 读写节点文本，不解析 HTML，通常不关心布局。
- `innerHTML` 解析/序列化 HTML，处理不可信字符串会产生 XSS 风险。
- `innerText` 近似用户可见文本，受样式、换行和布局影响，读取可能触发布局。

DocumentFragment 可临时组织节点，插入时移动其子节点；template 的 `content` 是惰性的 DocumentFragment，适合克隆静态结构。它们改善结构和批量操作，但框架批处理及浏览器优化下不应假定必然更快。

写样式后读取 `offset*`、`client*`、`scroll*`、`getBoundingClientRect` 或某些 computed style，可能强制结算待处理布局。优化方式是批量读、计算、批量写，并用 Performance trace 验证。
