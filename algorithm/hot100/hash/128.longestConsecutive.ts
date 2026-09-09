// need review
function longestConsecutive(nums: number[]): number {
  const cache = new Set(nums);

  // fix: should consider `[]`
  let maxLength = 0,
    currentLength,
    next,
    prev;

  // fix: should iterate set to avoid unnecessary checks
  for (const num of cache) {
    prev = num - 1;
    // find start num
    if (!cache.has(prev)) {
      currentLength = 1;
      next = num + 1;

      while (cache.has(next)) {
        next++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}
