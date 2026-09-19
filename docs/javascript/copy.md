# 浅拷贝、深拷贝与结构化克隆

展开语法、Object.assign、Array.slice 只复制一层自身可枚举值；嵌套对象仍共享。访问器可能在读取复制源时执行，descriptor 和原型通常不会原样保留。

JSON stringify/parse 会丢失 undefined、Symbol、函数和原型，改变 Date，不能处理 BigInt/循环引用，也无法保留共享引用关系，不是通用 deepClone。

`structuredClone` 支持循环与共享引用，能复制 Map、Set、Date、ArrayBuffer 等可结构化克隆值；函数、DOM 节点等不可克隆。transfer 可移动 ArrayBuffer 所有权以减少复制。

手写 deepClone 前必须定义范围：是否保留 prototype、descriptor、Symbol、不可枚举属性、Map key 身份与特殊宿主对象。多数状态更新只需复制被修改路径；无条件深拷贝成本高且破坏身份缓存。
