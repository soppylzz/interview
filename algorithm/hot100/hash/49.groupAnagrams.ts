function generateKey(str: string) {
  const keyArr = Array(26).fill(0);
  for (let i = 0; i < str.length; i++) {
    const sNum = str[i].charCodeAt(0) - 'a'.charCodeAt(0);
    keyArr[sNum]++;
  }
  return keyArr.join('|');
}

function groupAnagrams(strs: string[]): string[][] {
  // tip: hash, generate key via word
  // ai advise: prime numbers multiple
  const result = new Map<string, string[]>();

  for (let i = 0; i < strs.length; i++) {
    const key = generateKey(strs[i]);

    if (result.has(key)) {
      const arr = result.get(key)!;
      arr.push(strs[i]);
    } else {
      result.set(key, [strs[i]]);
    }
  }

  return [...result.values()];
}
