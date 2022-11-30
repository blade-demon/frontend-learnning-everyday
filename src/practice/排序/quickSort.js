// 平均时间复杂度O(NlogN)，每次分割的时候，主元左边的元素个数都为0，而右边都为n-1个。这个时候，就需要分割n次了。而每次分割整理的时间复杂度为O(n)，所以最坏的时间复杂度为O(n2)。
// 快排：双向扫描

// 随机选取主元，降低平均时间复杂度
function randomPartion(arr, left, right) {
  let i = Math.floor(Math.random() * (right - left + 1));
  [arr[i], arr[left]] = [arr[left], arr[i]];

  return partion(arr, left, right);
}

function partion(arr, left, right) {
  let i = left + 1;
  let j = right;
  // 以左元素为主元
  let pivot = arr[left];
  // 双向扫描
  while (true) {
    // 左指针向右移动
    while (i <= j && pivot >= arr[i]) i++;
    while (i <= j && pivot <= arr[j]) j--;
    if (i >= j) break;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // 主元用于arr[j]交换
  arr[left] = arr[j];
  arr[j] = pivot;
  return j;
}

function quickSort(arr = [], left = 0, right = arr.length - 1) {
  let center;
  if (arr.length === 0) return [];
  if (left < right) {
    center = partion(arr, left, right);
    quickSort(arr, left, center - 1);
    quickSort(arr, center + 1, right);
  }
  return arr;
}

console.log(quickSort([42, 345, 0, 2, 34, -10, 23, 78, 23, 98]));
