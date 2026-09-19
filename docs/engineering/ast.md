# AST

token 是词法单元，CST 尽量保留完整语法结构，AST 则省略部分标点并突出程序语义。tokenizer 识别 token，parser 按语法把它们组织成树。

## 节点与遍历

`Program` 包含语句；Statement 表示控制流或动作；Expression 产生值；Declaration 引入绑定。visitor 的 enter 在访问子节点前执行，exit 在子节点后执行，适合自底向上汇总信息。

在 Babel 中：

- Node 保存语法数据；NodePath 保存节点在树中的位置及操作方法。
- Scope 表示词法作用域；Binding 连接一次声明及其引用、写入和常量状态。
- 文本相同的 Identifier 可能因遮蔽属于不同 binding，重命名必须通过 scope 分析。

替换节点时应使用 types 构造合法节点，维护父子类型约束，并防止新节点再次被同一 visitor 无限处理。删除声明前还要检查引用和副作用。

## 代码生成与映射

AST 通常不保存全部原始空白，因此 generator 只能按规则重新排版。节点的 source location 和 source map 把生成位置映射回原文件；多段转换要正确串联合并映射。

ESTree、Babel AST 和 TypeScript AST 关注点不同，节点名称和字段并不完全互换。codemod 用 AST 批量迁移源码，lint rule 分析并报告模式，compiler transform 负责生成另一种可执行代码。

实践时先打印最小样例的 AST，再写 visitor 和包含遮蔽、嵌套、重复执行的 fixture。
