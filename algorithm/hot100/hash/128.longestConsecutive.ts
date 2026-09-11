function longestConsecutive(nums: number[]): number {
  const cache = new Set(nums)

  let maxLength = 0

  // fix: should iterate set to avoid check duplicate num
  for (const num of cache) {
    if (cache.has(num - 1)) continue

    let next = num + 1,
      currentLength = 1
    while (cache.has(next)) {
      currentLength++
      next++
    }

    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
}
