# Template 与 Web Components 入口

template 的内容存放在 `HTMLTemplateElement.content` DocumentFragment 中，初始不渲染、脚本不执行、资源通常不按普通活动内容工作。使用前 clone/import 节点，避免重复移动同一实例。

`cloneNode(true)` 复制结构和 attribute，不复制 addEventListener 注册的监听器；id 也会被复制，插入前要避免重复。

slot 把外部 light DOM 分发到 Shadow DOM；Declarative Shadow DOM 可在 HTML 中声明影子树，利于服务端输出。Custom Element 名称需要连字符，定义后已有未知元素会升级并运行生命周期。

更完整的封装、事件和样式边界见 `docs/browser/webComponents.md`。
