import { TreeNode } from "./treeNode"

// more solution?
function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return []

  const result: number[][] = []
  const queue: TreeNode[] = [root]

  while (true) {
    if (queue.length === 0) break
    const cache: TreeNode[] = []
    const res: number[] = []

    while (queue.length) {
      const node = queue.shift()!

      res.push(node.val)
      node.left && cache.push(node.left)
      node.right && cache.push(node.right)
    }

    result.push(res)
    queue.push(...cache)
  }

  return result
}
