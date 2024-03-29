/**
 * 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
 *
 *   序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。
 *
 *   示例 1：
 *   输入：target = 9
 *   输出：[[2,3,4],[4,5]]
 *
 *   示例 2：
 *   输入：target = 15
 *   输出：[[1,2,3,4,5],[4,5,6],[7,8]]
 *
 *   限制： 1 <= target <= 10^5
 */

/**
 *  滑动窗口、指针
 *  整体思路：
 *  最容易想到的思路就是暴力枚举，因为题目条件要求至少含有两个数，所以枚举到 target/2 即可停止，时间复杂度较高
 *  更好的方式是使用滑动窗口，设立左右指针，从开始位置维护一个子数组作为窗口，判断该窗口是否求和为 target，如果是则将结果加入，如果小于 target 则窗口右移，大于 target 则窗口左移
 *  复杂度：
 *  时间复杂度：O(target)滑动窗口最多移动 target/2 次
 *  空间复杂度：O(1)。排除必要的存储结果数组之外，只需要保存左右指针
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
  let left = 1;
  let right = 2;
  let res = [];

  while (left < right) {
    let sum = ((left + right) * (right - left + 1)) / 2; // s=(a1+an)n/2

    if (sum === target) {
      let arr = [];
      for (let i = left; i <= right; i++) {
        arr[i - left] = i;
      }
      res.push(arr);
      left++;
    } else if (sum < target) {
      right++;
    } else {
      left++;
    }
  }

  return res;
};
