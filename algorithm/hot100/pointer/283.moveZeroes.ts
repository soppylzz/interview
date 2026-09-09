/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let offset = 0;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num === 0) {
      offset++;
    } else {
      nums[i - offset] = nums[i];
    }
  }

  for (let i = nums.length - offset; i < nums.length; i++) nums[i] = 0;
}
