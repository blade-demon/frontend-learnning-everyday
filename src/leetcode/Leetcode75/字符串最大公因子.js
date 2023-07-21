/**
 * @see https://leetcode.cn/problems/greatest-common-divisor-of-strings/?envType=study-plan-v2&envId=leetcode-75
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */

/**
  示例 1：

  输入：str1 = "ABCABC", str2 = "ABC"
  输出："ABC"
  示例 2：

  输入：str1 = "ABABAB", str2 = "ABAB"
  输出："AB"
  示例 3：

  输入：str1 = "LEET", str2 = "CODE"
  输出：""
 
 */

// 解释： https://leetcode.cn/problems/greatest-common-divisor-of-strings/solutions/145540/javascript-zhan-zhuan-xiang-chu-fa-fu-xiang-jin-ji/?envType=study-plan-v2&envId=leetcode-75
// const gcdOfStrings = function (str1, str2) {
//   if (str1 + str2 != str2 + str1) return "";

//   function gcd(a, b) {
//     return b === 0 ? a : gcd(b, a % b);
//   }

//   return str1.substring(0, gcd(str1.length, str2.length));
// };

/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
const kidsWithCandies = function (candies, extraCandies) {
  const result = [];
  for (let i = 0; i < candies.length; i++) {
    const temp = candies[i] + extraCandies;
    let j = 0;
    let tempStatus = true;
    while (j < candies.length) {
      if (i === j) {
        j++;
        continue;
      }
      if (candies[j] > temp) {
        tempStatus = false;
      }
      j++;
    }
    result.push(tempStatus);
  }

  return result;
};

kidsWithCandies([2, 3, 5, 1, 3], 3);
