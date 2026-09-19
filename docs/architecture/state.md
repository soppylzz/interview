# 状态建模与所有权

先区分 local UI state、跨组件 client state、server state、URL state 和 persistent state。把状态放到需要它的最低共同所有者，只有确有跨域共享才进入全局 store。

可由现有状态计算的值应派生而非重复存储，避免同步错误。实体数据可按 id normalize，关系存 id，减少重复对象和局部更新成本。

loading/error/success 等互斥组合适合 discriminated union 或状态机，避免多个 boolean 产生非法组合。

immutable update 创建变更路径的新身份，便于 selector/订阅判断；它不是无条件 deep clone。选择器应稳定、按需订阅，避免一个大 store 让全部 UI 重渲染。
