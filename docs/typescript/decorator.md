# 装饰器

装饰器用于在声明处复用注册、包装和初始化逻辑。装饰器表达式在类定义求值期间计算，随后按装饰器模型规定的顺序调用，不是实例方法第一次执行时才运行。

## 标准装饰器

标准类元素装饰器通常接收被装饰值和 context：

```ts
function logged<This, Args extends unknown[], Return>(
  method: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This>,
) {
  const name = String(context.name)
  return function (this: This, ...args: Args): Return {
    console.log(name)
    return method.call(this, ...args)
  }
}
```

类、方法、getter/setter、accessor 和字段具有不同 value/context 形状。装饰器可返回替换值，也可通过 `addInitializer` 注册类或实例初始化逻辑。多个装饰器表达式通常自上而下求值，实际应用自下而上组合，类似函数复合。

## 标准与 legacy 的区别

`experimentalDecorators` 启用的是较早的 legacy 模型，其参数常为 target、propertyKey、descriptor，并支持参数装饰器。`emitDecoratorMetadata` 与 reflect-metadata 生态也建立在这套模型上。

标准装饰器的签名、字段语义和初始化机制不同，不能直接复用 legacy decorator，也不能直接依赖 `emitDecoratorMetadata` 自动生成设计类型信息。选择框架前应确认它要求哪套模型。

装饰器常用于依赖注入、日志、缓存和访问控制，但会隐藏控制流。包装方法时要保持 `this`、参数、返回值和异常语义；安全检查仍必须发生在可信的运行时边界，不能仅凭类型或装饰器标记。
