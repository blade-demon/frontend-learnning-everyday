/**
 * @link https://leetcode.cn/leetbook/read/illustrate-lcof/xzlnkv/
 * 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 示例  1:
 *   输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
 *   输出: 2
 *   限制：1 <= 数组长度 <= 50000
 *
 */

// 本题常见解法共有 3 种
// 数组排序：首先将 nums 排序，由于该数字超过数组长度的一半，所以数组的中间元素就是答案，时间复杂度为 O(nlogn)O(nlogn)
// 哈希计数：遍历 nums 数组，将数字存在 HashMap 中，统计数字出现次数，统计完成后再遍历一次 HashMap，找到超过一半计数的数字，时间复杂度为 O(n)O(n)
// 摩尔投票：遍历 nums 数组，使用 count 进行计数，记录当前出现的数字为 cur，如果遍历到的 num 与 cur 相等，则 count 自增，否则自减，当其减为 0 时则将 cur 修改为当前遍历的 num，通过增减抵消的方式，最终达到剩下的数字是结果的效果，时间复杂度为 O(n)O(n)
// 摩尔投票是最优解法，时间复杂度：O(n)O(n)，空间复杂度：O(1)O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let cur = 0;
  let count = 0;
  for (const num of nums) {
    if (count == 0) {
      cur = num;
    }
    if (num == cur) {
      count++;
    } else {
      count--;
    }
  }
  return cur;
};
