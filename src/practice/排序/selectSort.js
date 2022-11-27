const arr = [3, 5, 38, 14, 22, -16, 25, 11, 56, 28, 86, 27, 14];

/**
 * 选择排序：数组从前到后每一轮都选择一个位置作为最小值然后拿该位置的元素一直和后面的每一个元素进行比较 进过一轮比较找到最小数据最后进行交换，数组的第一个元素即是数组中最小的元素
 * 然后从数组的第二个元素开始再次进行排序，依次下去最终得到排序好的数组
 * 时间复杂度O(n2)，空间复杂度O(1)，原地排序，非稳定
 * @param {Array} array
 * @returns
 */
const selectSort = (array) => {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    let min = i;

    for (let j = i + 1; j < len; j++) {
      if (array[min] > array[j]) min = j;
    }

    // 交换
    let tmp = array[i];
    array[i] = array[min];
    array[min] = tmp;
  }

  return array;
};

console.log(selectSort(arr));
