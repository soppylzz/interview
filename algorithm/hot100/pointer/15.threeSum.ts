// need review
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const threeArr = [];

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // note: use fixed left instead of fixed left/right
    let [left, right] = [i + 1, nums.length - 1];
    while (left < right) {
      const sum = num + nums[left] + nums[right];
      if (sum === 0) {
        threeArr.push([num, nums[left], nums[right]]);

        // fix: skip duplicate values
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else {
        if (sum > 0) {
          right--;
        } else {
          left++;
        }
      }
    }
  }

  return threeArr;
}
