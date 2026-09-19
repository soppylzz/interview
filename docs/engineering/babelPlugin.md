# 编写 Babel 插件与 Codemod

先用 AST Explorer 或 parser 输出确认目标语法的节点结构，再写 visitor。不要根据源码字符串替换，因为同样文本可能处于不同语法和作用域。

## 基本结构

```js
export default function ({ types: t }) {
  return {
    pre() {},
    visitor: {
      CallExpression(path, state) {
        if (!path.get('callee').isIdentifier({ name: 'oldApi' })) return
        const binding = path.scope.getBinding('oldApi')
        if (!binding) return
        path.get('callee').replaceWith(t.identifier('newApi'))
      },
    },
    post() {},
  }
}
```

NodePath 提供替换、删除和作用域查询；`@babel/types` 负责构造并校验节点。仅比较 Identifier 名称会误改被局部变量遮蔽的引用，应检查 Binding。

`pre` 初始化单文件状态，visitor 执行转换，`post` 汇总或清理；options 通常从 `state.opts` 读取。插件应尽量幂等，即重复运行不会继续改变结果。插入节点后必要时跳过遍历，防止再次命中。

codemod 遇到动态语法或语义不明确时应报告待人工处理位置，而不是猜测。测试至少包括 input/output fixture、作用域遮蔽、嵌套、注释、重复执行和 parse-generate-parse；snapshot 适合展示整体产物，关键语义仍要单独断言。
