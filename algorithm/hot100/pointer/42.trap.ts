/* ==================== dual pointer (*) ==================== */
function trap(height: number[]): number {
  let left,
    right,
    mid,
    currentTraped,
    traped = 0;

  /* =============== trap left =============== */
  left = 0;
  right = left + 1;
  currentTraped = 0;

  while (right < height.length) {
    if (height[right] >= height[left]) {
      left = right;
      traped += currentTraped;
      currentTraped = 0;
    } else {
      currentTraped += height[left] - height[right];
    }
    right++;
  }

  mid = left;

  /* =============== trap right =============== */
  right = height.length - 1;
  left = right - 1;
  currentTraped = 0;

  while (left >= mid) {
    if (height[left] >= height[right]) {
      right = left;
      traped += currentTraped;
      currentTraped = 0;
    } else {
      currentTraped += height[right] - height[left];
    }
    left--;
  }

  return traped;
}

/* ==================== monotonic stack ==================== */
function trapViaMonotonicStack(height: number[]): number {
  let traped = 0;
  const stack: number[] = [];

  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const bottom = stack.pop()!;
      if (stack.length === 0) break;

      const left = stack[stack.length - 1];
      const right = i;

      const width = right - left - 1;
      const depth = Math.min(height[left], height[right]) - height[bottom];

      // note: trap like [6, 3, 4(i)] -> [6, 4, 4]
      traped += width * depth;
    }

    stack.push(i);
  }

  return traped;
}

/* ==================== dp ==================== */
function trapViaDP(height: number[]): number {
  const n = height.length;

  const leftMax: number[] = new Array(n).fill(0);
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  const rightMax: number[] = new Array(n).fill(0);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let traped = 0;
  for (let i = 0; i < n; i++) {
    traped += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return traped;
}
