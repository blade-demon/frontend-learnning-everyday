/**
 * 输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。
 *
 * 示例 1：

 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[2,7] 或者 [7,2]
 * 示例 2：

 * 输入：nums = [10,26,30,31,47,60], target = 40
 * 输出：[10,30] 或者 [30,10]
 * 限制： 1 <= nums.length <= 10^5  1 <= nums[i] <= 10^6
 */

/**
 * 双指针
 * 标签：双指针
 * 整体思路：因为数组本身是有序的，那么完全可以在数组的开头 start 和结尾 end 位置各设置一个指针，通过二者的加和 sum 来找到目标值 target，如果 sum < target，则 start++，这样可以让下一次的 sum 变大，如果 sum > target，则 end--，这样可以让下一次的 sum 变小，找到结果
 * 时间复杂度：O(n)O(n)，空间复杂度：O(1)O(1)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const sum = nums[start] + nums[end];
    if (sum < target) {
      start++;
    } else if (sum > target) {
      end--;
    } else {
      return [nums[start], nums[end]];
    }
  }

  return [];
};
