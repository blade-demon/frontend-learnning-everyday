const arr = [3, 5, 14, 22, -16, 25, 11, -22, -77, 100, 56, 28, 86, 27, 14];

/**
 * 冒泡排序：从第一个元素开始，一直和后面的每一个元素进行比较，如果比第一个元素小那么就进行交换，进过一轮比较以后，数组的第一个元素即是数组中最小的元素
 * 然后从数组的第二个元素开始再次进行排序，依次下去最终得到排序好的数组
 * 平均时间复杂度O(n2), 最好的时间复杂度O(n)，最差是O(n2)，空间复杂度O(1)，原地排序，稳定
 * @param {Array} array
 * @returns
 */
const bubbleSort = (array) => {
  let timeStart = performance.now();
  const len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }

  console.log(performance.now() - timeStart);
  return array;
};

// console.log(bubbleSort(arr));

const optimizedBubbleSort = (array) => {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    // 假如从开始的第一对到结尾的最后一对，相邻的元素之间都没有发生交换的操作，这意味着右边的元素总是大于等于左边的元素，此时的数组已经是有序的了，我们无需再对剩余的元素重复比较下去了。    let flag = true;
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        flag = false;
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }

    if (flag) break;
  }

  return array;
};

console.log(optimizedBubbleSort(arr));
