/**
 * 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面 - 解决方案
 *
 * @desc 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
 * @example
 * 输入：nums = [1,2,3,4]
 * 输出：[1,3,2,4]
 * 注：[3,1,2,4] 也是正确的答案之一。
 * 1 <= nums.length <= 50000
 * 1 <= nums[i] <= 10000
 */

// 思路
// 标签：双指针
// 整体思路：首先指定前指针 start 和后指针 end，然后前指针定位偶数，后指针定位奇数，定位到之后将两个值互换，直到数组遍历完成
// 时间复杂度：O(n)O(n)，空间复杂度：O(1)O(1)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function (nums) {
  let start = 0;
  let end = nums.length - 1;

  while (start < end) {
    while (start < end && nums[start] % 2 === 1) {
      // start 位置为奇数
      start++;
    }

    while (start < end && nums[end] % 2 === 0) {
      // end 位置为偶数
      end--;
    }

    // 交换前后奇偶顺序
    [nums[start], nums[end]] = [nums[end], nums[start]];
  }

  return nums;
};
