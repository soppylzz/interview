// solution: 1) unbounded knapsack 2) bfs
function numSquares(n: number): number {
  /**
   * think: greedy with sqrt(n) fails (e.g., 12 = 4+4+4, not 9+1+1+1).
   * is this a knapsack problem, use sqrt(num) as the item bound?
   */
  let minCap = Infinity,
    currentCap

  const dp = Array(n + 1).fill(0)

  // redundant case: dp[i-2] + 2 is just dp[i-1] + 1 in disguise, so we ignore it
  for (let i = 1; i <= n; i++) {
    currentCap = Infinity

    for (let j = Math.floor(Math.sqrt(i)); j >= 1; j--) {
      currentCap = Math.min(currentCap, dp[i - j ** 2] + 1)
    }

    dp[i] = currentCap
  }

  return dp[n]
}
