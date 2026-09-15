function searchRange(nums: number[], target: number): number[] {
  /**
   * note: bi-search + start/end search -> the most worst is O(n)
   * we should use bi-search to replace left/right
   */

  let left = 0,
    right = nums.length,
    mid = 0

  while (left < right) {
    mid = (left + right) >> 1
    const num = nums[mid]

    if (num === target) {
      break
    } else if (num > target) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  // not founded
  if (nums[mid] !== target) return [-1, -1]

  // find range start
  let midRight = mid + 1,
    midLeft = mid

  while (left < midRight) {
    const mid = (left + midRight) >> 1
    const num = nums[mid]

    if (num === target) {
      midRight = mid
    } else {
      left = mid + 1
    }
  }

  // find range end
  while (midLeft < right) {
    const mid = (midLeft + right) >> 1
    const num = nums[mid]

    if (num === target) {
      midLeft = mid + 1
    } else {
      right = mid
    }
  }

  return [left, right - 1]
}

console.log(searchRange([1, 2, 3, 3, 4, 5], 3))
