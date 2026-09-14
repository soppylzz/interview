function subsets(nums: number[]): number[][] {
  const result: number[][] = [[]]

  const n = nums.length

  let temp: number[] = [],
    flag = 0

  function generate() {
    for (let i = flag; i < n; i++) {
      const old = flag
      temp.push(nums[i])

      flag = i + 1
      result.push([...temp])
      generate()

      temp.pop()
      flag = old
    }
  }

  generate()

  return result
}
