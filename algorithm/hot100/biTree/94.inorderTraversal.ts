import { TreeNode } from "./treeNode"

// solution: 1) recursion 2) iteration!
function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []
  function traverse(root: TreeNode | null) {
    if (root === null) return

    traverse(root.left)
    result.push(root.val)
    traverse(root.right)
  }

  traverse(root)

  return result
}
