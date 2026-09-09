function maxArea(height: number[]): number {
  let left = 0,
    right = height.length - 1,
    maxArea = 0;

  while (left < right) {
    const leftHeight = height[left];
    const rightHeight = height[right];

    const currentArea = (right - left) * Math.min(leftHeight, rightHeight);
    maxArea = Math.max(currentArea, maxArea);

    // move min height pointer
    if (leftHeight > rightHeight) {
      right--;
    } else {
      left++;
    }
  }

  return maxArea;
}
