/**
 * 154. 寻找旋转排序数组中的最小值 II
 * @link https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/
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
  return nums[right];
};
