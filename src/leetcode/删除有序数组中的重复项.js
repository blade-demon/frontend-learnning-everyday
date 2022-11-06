/**
 * 删除有序数组中的重复项
 * @see https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let p = 0;
  let q = 1;

  while (q < nums.length) {
    if (nums[p] < nums[q]) {
      nums[p + 1] = nums[q];
      p++;
      q++;
    } else if (nums[p] === nums[q]) {
      q++;
    }
  }

  return p + 1;
};
