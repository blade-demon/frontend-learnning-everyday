// https://mp.weixin.qq.com/s?__biz=Mzg2NzA4MTkxNQ==&mid=2247485191&idx=1&sn=45a43bd77495566db53b419ae82136f5&source=41#wechat_redirect
// 快排：双向扫描
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
}

console.log(quickSort([42, 345, 0, 23, 78, 23, 98]));
