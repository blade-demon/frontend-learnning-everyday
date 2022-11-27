const arr = [3, 5, 38, 14, 22, -16, 25, 11, 56, 28, 86, 27, 14];

/**
 * 插入排序：从数组的第二个元素开始抽取元素，如果后面的元素比所有前面的元素都要小那么就放到最前面，然后继续往后依次往复
 * 时间复杂度O(n2), 空间复杂度O(1)，原地排序，稳定
 * @param {Array} array
 * @returns
 */
const insertSort = (array) => {
  const length = array.length;
  for (let i = 1; i < length; i++) {
    // 从第一个元素开始，将右边无序的元素插入到左边的有序部分中
    let toBeInserted = arr[i];
    let j = i - 1;
    for (; j >= 0 && array[j] > toBeInserted; j--) {
      array[j + 1] = array[j];
    }

    array[j + 1] = toBeInserted;
  }
  return array;
};

console.log(insertSort(arr));
