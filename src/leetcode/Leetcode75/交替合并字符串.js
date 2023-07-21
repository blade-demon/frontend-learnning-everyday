/**
 * @see https://leetcode.cn/problems/merge-strings-alternately/?envType=study-plan-v2&envId=leetcode-75
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */

/**
示例 1：
输入：word1 = "abc", word2 = "pqr"
输出："apbqcr"
解释：字符串合并情况如下所示：
word1：  a   b   c
word2：    p   q   r
合并后：  a p b q c r

示例 2：
输入：word1 = "ab", word2 = "pqrs"
输出："apbqrs"
解释：注意，word2 比 word1 长，"rs" 需要追加到合并后字符串的末尾。
word1：  a   b 
word2：    p   q   r   s
合并后：  a p b q   r   s

示例 3：
输入：word1 = "abcd", word2 = "pq"
输出："apbqcd"
解释：注意，word1 比 word2 长，"cd" 需要追加到合并后字符串的末尾。
word1：  a   b   c   d
word2：    p   q 
合并后：  a p b q c   d
 */

// const mergeAlternately = function (word1, word2) {
//   const word1Arr = word1.split("");
//   const word2Arr = word2.split("");
//   const result = [];
//   const length = Math.max(word1.length, word2.length);
//   for (let i = 0; i < length; i++) {
//     if (word1Arr[i] === undefined) {
//       word1Arr[i] = "";
//     }
//     if (word2Arr[i] === undefined) {
//       word2Arr[i] = "";
//     }
//     result.push(word1Arr[i] + word2Arr[i]);
//   }
//   return result.join("");
// };

// 双指针
const mergeAlternately = function (word1, word2) {
  const length1 = word1.length;
  const length2 = word2.length;
  let i = 0;
  let j = 0;
  const result = [];
  while (i < length1 || j < length2) {
    if (i < length1) {
      result.push(word1[i]);
      i++;
    }
    if (j < length2) {
      result.push(word2[j]);
      j++;
    }
  }

  return result.join("");
};

mergeAlternately("abcd", "pq");
