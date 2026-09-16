function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length
  const n = matrix[0].length

  let row = 0,
    col = n - 1

  // light: bi-search tree
  while (row < m && col >= 0) {
    const cur = matrix[row][col]

    if (cur === target) {
      return true
    } else if (cur > target) {
      col--
    } else {
      row++
    }
  }
  return false
}
