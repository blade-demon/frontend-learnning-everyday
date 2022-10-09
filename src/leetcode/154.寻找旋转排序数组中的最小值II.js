/**
 * 154. 寻找旋转排序数组中的最小值 II
 * @link https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/
 *
 * @description 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 给你一个可能存在 重复 元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为 1。
 * 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。
 *
 * @example1
 * 输入：nums = [1,3,5]
 * 输出：1
 *
 * @example2
 * 输入：nums = [2,2,2,0,1]
 * 输出：0
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // O(n)
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < numbers[i - 1]) {
      return numbers[i];
    }
  }
  return numbers[0];
};

var findMin = function (nums) {
  // O(LogN)
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = parseInt((left + right) / 2);

    if (nums[mid] < nums[right]) {
      right = mid;
    } else if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right--;
    }
  }

  return nums[left];
};
