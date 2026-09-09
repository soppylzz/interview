function firstMissingPositiveEquivalent(nums: number[]): number {
  const cache = Array(nums.length + 1).fill(0)

  for (const num of nums) {
    if (num <= nums.length) cache[num - 1] = 1
  }

  let findIdx = -1
  for (let i = 0; i < cache.length; i++) {
    if (cache[i] === 0) {
      findIdx = i
      break
    }
  }

  return findIdx + 1
}

function firstMissingPositive(nums: number[]): number {
  const n = nums.length

  for (let i = 0; i < nums.length; i++) {
    // light: use while to check each new nums[i]
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const idx = nums[i] - 1
      ;[nums[i], nums[idx]] = [nums[idx], nums[i]]
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1
  }
  return n + 1
}
